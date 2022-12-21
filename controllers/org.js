const Org = require("../models/org_travel");
const cloudinary = require("../helpers/cloudinary");
const storage = require("../helpers/multer");
const multer = require("multer");
const fs = require("fs");

exports.addImage = async (req, res) => {
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

exports.addOrg = async (req, res) => {
  try {
    const {
      destination,
      description,
      programme,
      price,
      metakeywords,
      metatitle,
      metadescription,
      bestorg,
      cloudinary_ids,
      pictures,
    } = req.body;

    const newOrg = new Org({
      destination,
      description,
      programme,
      price,
      metakeywords,
      metatitle,
      metadescription,
      bestorg,
      cloudinary_ids,
      pictures,
    });
    const response = await newOrg.save();
    res.status(200).send({ message: "the flight has been added", response });
  } catch (error) {
    res.status(400).send("can not save it");
  }
};

exports.getAllOrg = async (req, res) => {
  try {
    const PAGE_SIZE = 1;
    const page = parseInt(req.query.page || "0");
    const total = await Org.countDocuments({});
    const result = await Org.find()
      .sort({ _id: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.send({
      response: result,
      totalPages: Math.ceil(total / PAGE_SIZE),
      message: "Travels found",
    });
  } catch (error) {
    res.status(400).send({ message: "can not get The organized travels list" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const PAGE_SIZE = 7;
    const page = parseInt(req.query.page || "0");
    const total = await Org.countDocuments({});
    const query = {};
    if (req.query.search) {
      query.destination = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    if (req.query.search === "") {
      const result = await Org.find()
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      res.send({
        response: result,
        totalPages: Math.ceil(total / PAGE_SIZE),
        message: "trips trouvés!",
      });
    } else {
      const result = await Org.find(query).sort({ _id: -1 });

      res.send({
        response: result,
        totalPages: 1,
        message: "trips trouvés!",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "erreur serveur" });
  }
};

exports.getOrgById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Org.findById(id);

    if (!result) {
      res.status(400).send({ msg: "There is no travel " });
      return;
    } else {
      res.send({ message: "travel found ", result });
    }
  } catch (error) {
    res.status(400).send({ message: "There is no travel" });
  }
};

exports.deleteOrg = async (req, res) => {
  try {
    const org = await Org.findById({ _id: req.params.id });
    const cloudinary_ids = org.cloudinary_ids;
    cloudinary_ids.map(async (el) => {
      await cloudinary.uploader.destroy(el);
    });
    const result = await Org.deleteOne({ _id: req.params.id });
    result.n
      ? res.status(200).send({ message: "Travel deleted" })
      : res.send("there is no travel with this id");
  } catch (error) {
    res.send("server error");
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.body.imageID);
    const org = await Org.findById(req.body.id);
    const { cloudinary_ids, pictures } = org;
    let arr = [];
    let arr2 = [];
    arr = cloudinary_ids.filter((item) => item !== req.body.imageID);
    arr2 = pictures.filter((item) => item !== req.body.pictureUrl);
    const result1 = await Org.updateOne(
      { _id: org._id },
      {
        $set: {
          cloudinary_ids: arr,
          pictures: arr2,
        },
      }
    );
    if (result) {
      res.status(200).send({ message: "Picture is deleted" });
    }
  } catch (error) {
    res.status(400).send("erreur serveur ");
  }
};

exports.updateOrg = async (req, res) => {
  try {
    const orgg = await Org.findById({ _id: req.body.id });
    const {
      destination,
      description,
      programme,
      price,
      metakeywords,
      metatitle,
      metadescription,
      bestorg,
      cloudinary_ids,
      pictures,
    } = req.body;

    if (cloudinary_ids.length > 0 && pictures.length > 0) {
      let cloudinary_id = [];
      let picture = [];
      cloudinary_id = orgg.cloudinary_ids;
      picture = orgg.pictures;
      const a = cloudinary_id.concat(cloudinary_ids);
      const b = picture.concat(pictures);

      const resu = await Org.updateOne(
        { _id: req.body.id },
        {
          $set: {
            destination,
            description,
            programme,
            price,
            metakeywords,
            metatitle,
            metadescription,
            bestorg,
            cloudinary_ids: a,
            pictures: b,
          },
        }
      );
      res.status(200).send({ message: "The travel has been updated" });
    } else {
      const resu = await Org.updateOne(
        { _id: req.body.id },
        {
          $set: {
            destination,
            description,
            programme,
            price,
            metakeywords,
            metatitle,
            metadescription,
            bestorg,
          },
        }
      );

      res.status(200).send({ message: "The travel has been updated" });
    }
  } catch (error) {
    res.status(400).send({ error: { message: "erreur serveur" } });
  }
};

exports.getOrgByDestination = async (req, res) => {
  try {
    const PAGE_SIZE = 3;
    const page = parseInt(req.query.page || "0");
    const total = await Org.countDocuments({});
    const query = {};
    if (req.query.search) {
      query.destination = {
        $regex: req.query.search,
        $options: "i",
      };
    }
    if (req.query.search === "") {
      const result = await Org.find()
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      res.send({
        response: result,
        totalPages: Math.ceil(total / PAGE_SIZE),
        message: "voyages trouvés!",
      });
    } else {
      const result = await Org.find(query)
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      console.log(result);
      res.send({
        response: result,
        totalPages: Math.ceil(result.length / PAGE_SIZE),
        message: "Voyages trouvés!",
      });
    }
  } catch (error) {
    res
      .status(402)
      .send({ message: "There is no travels to this destination" });
  }
};

exports.loadBestTrips = async (req, res) => {
  try {
    const result = await Org.find({ bestorg: true }).sort({ _id: -1 }).limit(3);

    res.send({ response: result, message: "best trips trouvés!" });
  } catch (error) {
    res.status(400).send({ message: "erreur serveur" });
  }
};
exports.loadBestTrips = async (req, res) => {
  try {
    const result = await Org.find({ bestorg: true }).sort({ _id: -1 }).limit(3);

    res.send({ response: result, message: "best trips trouvés!" });
  } catch (error) {
    res.status(400).send({ message: "erreur serveur" });
  }
};

exports.loadBestTripsAll = async (req, res) => {
  try {
    const PAGE_SIZE = 6;
    const page = parseInt(req.query.page || "0");

    const result = await Org.find({ bestorg: true })
      .sort({ _id: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    res.send({
      response: result,
      message: "Trips trouvés!",
      totalPages: Math.ceil(result.length / PAGE_SIZE),
    });
  } catch (error) {
    res.status(400).send({ message: "erreur serveur" });
  }
};
