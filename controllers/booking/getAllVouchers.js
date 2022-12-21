const Booking = require("../../models/booking");

const { sendEmailWithForVoucher } = require("../../helpers/email");
const {
  generate_html_file,
  generate_pdf,
} = require("../../helpers/html_email/file_generation");
const {
  generate_voucher,
} = require("../../helpers/html_email");

const cloudinary = require("../../helpers/cloudinary");


exports.getAllVouchers = async (req, res) => {
  try {
    const PAGE_SIZE = 7;
    const page = parseInt(req.query.page || "0");
    const total = await Booking.countDocuments({});
    const query = {};
    if (req.query.search) {
      query.Cin = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    if (req.query.search === "") {
      const result = await Booking.find()
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      res.send({
        response: result,
        totalPages: Math.ceil(total / PAGE_SIZE),
        message: "vouchers  trouvés!",
      });
    } else {
      const result = await Booking.find(query).sort({ _id: -1 });

      res.send({
        response: result,
        totalPages: 1,
        message: "Vouchers trouvés!",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "erreur serveur" });
  }
};
exports.ValidateVocuherAgency = async (req, res) => {
  const { _id } = req.body;
  Booking.findOne({ _id }, async (err, voucher) => {
    if (err || !voucher) {
      return res.status(400).json({
        error: "Voucher n'existe pas",
      });
    }
    if (voucher.paidAgency) {
      return res.status(400).json({
        error: "Voucher est validé",
      });
    }
    const {
      nuits,
      paidAgency,
      nomHotel,
      tel,
      dateD,
      logement,
      arrive,
      Cin,
      email,
      rooms,
      name,
    } = voucher;
    console.log(rooms);




    const generationObject = {
      nomHotel,
      logement,
      rooms,
      nombreAdulte: this.nombreAdulte,
      arrive,
      dateD,
      nuits,
      Cin,
      name,
      tel,
      email,
    };

    try {
      const html_file_path = await generate_html_file(
        generationObject,
        generate_voucher
      );
      const pdf_file_path = await generate_pdf(html_file_path);
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        pdf_file_path
      );
      const emailData = {
        from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
        to: voucher.email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
        subject: "Bon voucher",

        attachments: [
          {
            filename: "Voucher.pdf",
            path: pdf_file_path,
          },
        ],
      };
      sendEmailWithForVoucher(emailData);

      await Booking.updateOne(
        { _id: _id },
        {
          $set: {
            paidAgency: true,
            pdfUrl: secure_url,
            pdfId: public_id,
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }

    return res.status(200).json({
      message: "Voucher est validé",
    });
  });
};




