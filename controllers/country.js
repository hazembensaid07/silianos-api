const Country = require("../models/country");
const cloudinary = require("../helpers/cloudinary");
const storage = require("../helpers/multer");
const multer = require("multer");
const fs = require("fs");

exports.addCountry = async (req, res) => {
  try {
    const { name, cloudinary_ids, pictures } = req.body;
    const country = new Country({
      name,
      cloudinary_ids,
      pictures,
    });

    const response = await country.save();

    res.status(200).send({ message: "Le pays est ajouté avec succés" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "erruer serveur" });
  }
};

exports.addImage = async (req, res) => {
  try {
    //upload pictures to cloudinary
    //storage the helper function that will upload the images to the tempory path in the server before upload to cloudinary
    //images are sent in req as form data
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
//get countries by name based on page number country name (taken from search box )
exports.getByName = async (req, res) => {
  try {
    const PAGE_SIZE = 3;
    const page = parseInt(req.query.page || "0");
    const total = await Country.countDocuments({});
    const query = {};
    console.log(req.query);
    if (req.query.search) {
      query.name = {
        $regex: req.query.search,
        $options: "i",
      };
    }
    if (req.query.search === "") {
      const result = await Country.find()
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      res.send({
        response: result,
        totalPages: Math.ceil(total / PAGE_SIZE),
        message: "Pays trouvés!",
      });
    } else {
      const result = await Country.find(query)
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      console.log(result);
      res.send({
        response: result,
        totalPages: Math.ceil(result.length / PAGE_SIZE),
        message: "Pays trouvés!",
      });
    }
  } catch (error) {
    res.status(402).send({ message: "Il n'ya pas le pays selectionné" });
  }
};
//delete country function
exports.deleteCountry = async (req, res) => {
  try {
    const country = await Country.findById({ _id: req.params.id });
    const cloudinary_ids = country.cloudinary_ids;
    cloudinary_ids.map(async (el) => {
      await cloudinary.uploader.destroy(el);
    });
    const result = await Country.deleteOne({ _id: req.params.id });
    result.n
      ? res.status(200).send({ message: "Le est supprimé" })
      : res.send("Pays non trouvé");
  } catch (error) {
    res.status(400).send({ message: "erreur serveur" });
  }
};
//delete photo from cloudinary
exports.deletePhoto = async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.body.imageID);
    const country = await Country.findById(req.body.id);
    const { cloudinary_ids, pictures } = country;
    let arr = [];
    let arr2 = [];
    arr = cloudinary_ids.filter((item) => item !== req.body.imageID);
    arr2 = pictures.filter((item) => item !== req.body.pictureUrl);
    const result1 = await Country.updateOne(
      { _id: country._id },
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
    console.log(error);
  }
};

exports.updateCountry = async (req, res) => {
  try {
    const count = await Country.findById({ _id: req.body.id });

    const { name, cloudinary_ids, pictures } = req.body;
    if (cloudinary_ids.length > 0 && pictures.length > 0) {
      let cloudinary_id = [];
      let picture = [];
      cloudinary_id = count.cloudinary_ids;
      picture = count.pictures;
      const a = cloudinary_id.concat(cloudinary_ids);
      const b = picture.concat(pictures);
      const resu = await Country.updateOne(
        { _id: req.body.id },
        {
          $set: {
            name,
            cloudinary_ids: a,
            pictures: b,
          },
        }
      );

      res.status(200).send({ message: "Le pays est modifié avec succés" });
    } else {
      const resu = await Country.updateOne(
        { _id: req.body.id },
        {
          $set: {
            name,
          },
        }
      );
      res.status(200).send({ message: "Le pays est modifié avec succés" });
    }
  } catch (error) {
    res.status(500).send({ error: { message: "erreur serveur" } });
  }
};
