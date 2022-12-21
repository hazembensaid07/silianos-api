const Hotel = require("../models/hotel");
const cloudinary = require("../helpers/cloudinary");
const storage = require("../helpers/multer");
const multer = require("multer");
const fs = require("fs");
const Org = require("../models/org_travel");
const Booking = require("../models/booking");
exports.addHotel = async (req, res) => {
  try {
    const upload = multer({ storage }).any("image");
    upload(req, res, async (err) => {
      if (req.files) {
        const files = req.files;

        let result = {};
        let cloudinary_ids = [];
        let pictures = [];
        for (const file of files) {
          const { path } = file;
          result = await cloudinary.uploader.upload(path);
          cloudinary_ids.push(result.public_id);
          pictures.push(result.secure_url);
          fs.unlinkSync(path);
        }
        if (result) {
          res.status(200).send({ message: "sucess", cloudinary_ids, pictures });
        } else {
          res.status(400).send({ error: "cannot upload" });
        }
      } else {
        res
          .status(200)
          .send({ message: " succés", cloudinary_ids: [], pictures: [] });
      }
    });
  } catch (error) {
    res.status(500).send({ error: { message: "erreur serveur" } });
  }
};
exports.addHoteldata = async (req, res) => {
  try {
    const {
      name,
      description,
      ville,
      etoiles,
      logement,
      localisation,
      besthotel,
      metadescription,
      metakeywords,
      metatitle,
      prices,

      supsuite,
      supvuesurmer,
      familyonly,
      totalchambre,
      autres,
      maxchambre,
      cloudinary_ids,
      pictures,
    } = req.body;
    const hotel = new Hotel({
      name,
      description,
      ville,
      etoiles,
      logement,
      localisation,
      besthotel,
      metadescription,
      metakeywords,
      metatitle,
      prices,

      supsuite,
      supvuesurmer,
      familyonly,
      totalchambre,
      autres,
      maxchambre,
      cloudinary_ids,
      pictures,
    });

    const response = await hotel.save();

    res.status(200).send({ message: "L'hotel est ajouté avec succés" });
  } catch (error) {
    res.status(400).send({ error: "erruer serveur" });
  }
};
/// get hotels with pagination
exports.loadAllHotels = async (req, res) => {
  try {
    const PAGE_SIZE = 7;
    const page = parseInt(req.query.page || "0");
    const total = await Hotel.countDocuments({});
    const query = {};
    if (req.query.search) {
      query.name = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    if (req.query.search === "") {
      const result = await Hotel.find()
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      res.send({
        response: result,
        totalPages: Math.ceil(total / PAGE_SIZE),
        message: "Hotels trouvés!",
      });
    } else {
      const result = await Hotel.find(query).sort({ _id: -1 });

      res.send({
        response: result,
        totalPages: 1,
        message: "Hotels trouvés!",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "erreur serveur" });
  }
};
exports.loadActiveHotels = async (req, res) => {
  try {
    const PAGE_SIZE = 7;
    const page = parseInt(req.query.page || "0");
    const query = {};
    if (req.query.search) {
      query.name = {
        $regex: req.query.search,
        $options: "i",
      };
      query.total_chambres = { $ne: 0 };
    }

    if (req.query.search === "") {
      const resut = await Hotel.find({ total_chambre: { $ne: 0 } }).sort({
        _id: -1,
      });
      const result = await Hotel.find({ total_chambre: { $ne: 0 } })
        .sort({
          _id: -1,
        })
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      res.send({
        response: result,
        length: resut.length,
        totalPages: Math.ceil(resut.length / PAGE_SIZE),
        message: "Hotels trouvés!",
      });
    } else {
      const result = await Hotel.find(query).sort({ _id: -1 });

      res.send({
        response: result,
        totalPages: 1,
        message: "Hotels trouvés!",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "erreur serveur" });
  }
};
// get hotel by id
exports.loadHotel = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Hotel.findById(id);

    if (!result) {
      res.status(400).send({ msg: "L'hotel n'existe pas   " });
      return;
    } else {
      res.status(200).send({ message: "L'hotel est trouvé ", result });
    }
  } catch (error) {
    res.status(500).send({ message: "erreur serveur" });
  }
};
exports.loadDisabledHotels = async (req, res) => {
  try {
    const PAGE_SIZE = 7;
    const page = parseInt(req.query.page || "0");
    const query = {};
    if (req.query.search) {
      query.name = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    if (req.query.search === "") {
      const resut = await Hotel.find({ totalchambre: 0 });
      const result = await Hotel.find({ totalchambre: 0 })
        .sort({
          _id: -1,
        })
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      res.send({
        response: result,
        length: resut.length,
        totalPages: Math.ceil(resut.length / PAGE_SIZE),
        message: "Hotels trouvés!",
      });
    } else {
      const result = await Hotel.find(query).sort({ _id: -1 });

      res.send({
        response: result,
        totalPages: 1,
        message: "Hotels trouvés!",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "erreur serveur" });
  }
};
// update hotel by id
exports.updateHotel = async (req, res) => {
  try {
    const hot = await Hotel.findById({ _id: req.body.id });

    const {
      name,
      description,
      ville,
      etoiles,
      logement,
      localisation,
      besthotel,
      metadescription,
      metakeywords,
      metatitle,
      prices,

      supsuite,
      supvuesurmer,
      familyonly,
      totalchambre,
      autres,
      maxchambre,
      cloudinary_ids,
      pictures,
    } = req.body;
    if (cloudinary_ids.length > 0 && pictures.length > 0) {
      let cloudinary_id = [];
      let picture = [];
      cloudinary_id = hot.cloudinary_ids;
      picture = hot.pictures;
      const a = cloudinary_id.concat(cloudinary_ids);
      const b = picture.concat(pictures);
      console.log(a);
      const resu = await Hotel.updateOne(
        { _id: req.body.id },
        {
          $set: {
            name,
            description,
            ville,
            etoiles,
            logement,
            localisation,
            besthotel,
            metadescription,
            metakeywords,
            metatitle,
            prices,

            supsuite,
            supvuesurmer,
            familyonly,
            totalchambre,
            autres,
            maxchambre,
            cloudinary_ids: a,
            pictures: b,
          },
        }
      );

      res.status(200).send({ message: "L'hotel est modifié avec succés" });
    } else {
      const resu = await Hotel.updateOne(
        { _id: req.body.id },
        {
          $set: {
            name,
            description,
            ville,
            etoiles,
            logement,
            localisation,
            besthotel,
            metadescription,
            metakeywords,
            metatitle,
            prices,

            supsuite,
            supvuesurmer,
            familyonly,
            totalchambre,
            autres,
            maxchambre,
          },
        }
      );
      res.status(200).send({ message: "L'hotel est modifié avec succés" });
    }
  } catch (error) {
    res.status(500).send({ error: { message: "erreur serveur" } });
  }
};
// delete hotel by id
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById({ _id: req.params.id });
    const cloudinary_ids = hotel.cloudinary_ids;
    cloudinary_ids.map(async (el) => {
      await cloudinary.uploader.destroy(el);
    });
    const result = await Hotel.deleteOne({ _id: req.params.id });
    result.n
      ? res.status(200).send({ message: "L'hotel est supprimé" })
      : res.send("Hotel non trouvé");
  } catch (error) {
    res.status(400).send({ message: "erreur serveur" });
  }
};
exports.searchHotel = async (req, res) => {
  try {
    const query = {};
    query.name = {
      $regex: req.body.search,
      $options: "i",
    };
    const result = await Hotel.find(query);

    res.send({ response: result, message: "Hotels trouvés" });
  } catch (error) {
    res.status(400).send({ message: "Hotels non  trouvés" });
  }
};
exports.deletePhoto = async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.body.imageID);
    const hotel = await Hotel.findById(req.body.id);
    const { cloudinary_ids, pictures } = hotel;
    let arr = [];
    let arr2 = [];
    arr = cloudinary_ids.filter((item) => item !== req.body.imageID);
    arr2 = pictures.filter((item) => item !== req.body.pictureUrl);
    const result1 = await Hotel.updateOne(
      { _id: hotel._id },
      {
        $set: {
          cloudinary_ids: arr,
          pictures: arr2,
        },
      }
    );
    if (result) {
      res.status(200).send({ message: "image  est supprimée" });
    }
  } catch (error) {
    res.status(400).send("erreur serveur ");
  }
};
exports.getHotelsName = async (req, res) => {
  try {
    const query = {};
    query.name = {
      $regex: req.body.search,
      $options: "i",
    };
    const result = await Hotel.find(query, { _id: false }).select("name");

    res.send({ response: result, message: "Hotels trouvés" });
  } catch (error) {
    res.status(400).send({ message: "Hotels non  trouvés" });
  }
};
exports.loadBestHotels = async (req, res) => {
  try {
    const PAGE_SIZE = 6;
    const page = parseInt(req.query.page || "0");
    const resut = await Hotel.find({ besthotel: true }).sort({ _id: -1 });

    const result = await Hotel.find({ besthotel: true })
      .sort({ _id: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    res.send({
      response: result,
      message: "Hotels trouvés!",
      totalPages: Math.ceil(resut.length / PAGE_SIZE),
    });
  } catch (error) {
    res.status(400).send({ message: "erreur serveur" });
  }
};
exports.loadBestHotelsFive = async (req, res) => {
  try {
    const result = await Hotel.find({ besthotel: true })
      .sort({ _id: -1 })
      .limit(5);

    res.send({ response: result, message: "Hotels trouvés!" });
  } catch (error) {
    res.status(400).send({ message: "erreur serveur" });
  }
};
exports.loadDiscountHotels = async (req, res) => {
  try {
    const PAGE_SIZE = 6;
    const page = parseInt(req.query.page || "0");
    //https://kb.objectrocket.com/mongo-db/use-mongoose-to-find-in-an-array-of-objects-1206
    const resut = await Hotel.find({
      "prices.discount": { $ne: 0 },
    }).sort({ _id: -1 });
    const result = await Hotel.find({ "prices.discount": { $ne: 0 } })
      .sort({ _id: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    res.send({
      response: result,
      message: "Hotels trouvés!",
      totalPages: Math.ceil(resut.length / PAGE_SIZE),
    });
  } catch (error) {
    res.status(400).send({ message: "erreur serveur" });
  }
};
exports.loadDiscountHotelsFive = async (req, res) => {
  try {
    const resut = await Hotel.find({ "prices.discount": { $ne: 0 } })
      .sort({ _id: -1 })
      .limit(5);

    res.send({ response: resut, message: "Hotels trouvés!" });
  } catch (error) {
    res.status(400).send({ message: "erreur serveur" });
  }
};
exports.loadStatistics = async (req, res) => {
  try {
    const hotel = await Hotel.countDocuments({});
    const org = await Org.countDocuments({});
    const voucher = await Booking.countDocuments({});
    res.send({ hotel, voucher, org });
  } catch (error) {
    res.status(400).send({ message: "erreur serveur" });
  }
};
