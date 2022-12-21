const Booking = require("../../models/booking");

const { sendEmailWithForVoucher } = require("../../helpers/email");
const {
  generate_html_file,
  generate_pdf,
} = require("../../helpers/html_email/file_generation");
const { generate_bon2 } = require("../../helpers/html_email");

const cloudinary = require("../../helpers/cloudinary");

exports.ValidateVoucherAgency = async (req, res) => {
  try {
    const { _id } = req.body;

    const voucher = await Booking.findById(_id);
    if (!voucher) {
      return res.status(400).json({
        error: "no",
      });
    }

    if (voucher.paidAgency) {
      res.status(400).json({
        error: "Voucher est validé erreur",
      });
    }

    const {
      nuits,
      nomHotel,
      tel,
      date_départ,
      date_arrivée,
      Cin,
      email,
      rooms,
      name,
      price,
      message,
      occupation,
      logement,
      num,
    } = voucher;

    try {
      const obj = {
        nomHotel,
        rooms,
        arrive: date_arrivée,
        dateD: date_départ,
        nuits,
        Cin,
        name,
        tel,
        email,
        occupation,
        price,
        message,
        _id,
        logement,
        num,
      };
      const html_file_path = await generate_html_file(obj, generate_bon2);
      const pdf_file_path = await generate_pdf(html_file_path);
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        pdf_file_path
      );
      // TODO: GENERATE2

      const emailData = {
        from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
        to: voucher.email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
        subject: "Bon de voucher",
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
      message: "Voucher est validé oui",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Erreur serveur",
    });
  }
};
