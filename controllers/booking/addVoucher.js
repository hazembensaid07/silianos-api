const Booking = require("../../models/booking");
const crypto = require("crypto");
const { sendEmailWithForVoucher } = require("../../helpers/email");
const {
  generate_html_file,
  generate_pdf,
} = require("../../helpers/html_email/file_generation");
const { generate_bon2, generate_bon } = require("../../helpers/html_email");

const cloudinary = require("../../helpers/cloudinary");

exports.addVoucher = async (req, res) => {
  const {
    nuits,
    paidAgency,
    nomHotel,
    tel,
    dateD,
    arrive,
    Cin,
    email,
    rooms,
    name,
    price,
    message,
    occupation,
    logement,
  } = req.body;

  try {
    const numero = 0620221;
    const total = await Booking.countDocuments({});
    //create voucher object data
    const generationObject = {
      nomHotel,
      rooms,
      arrive,
      dateD,
      nuits,
      Cin,
      name,
      tel,
      email,
      occupation,
      message,
      price,
      logement,
      _id: crypto.randomUUID(),
      num: numero + total,
    };
    let html_file_path = "";
    //we have three
    if (paidAgency) {
      html_file_path = await generate_html_file(
        generationObject,
        generate_bon2
      );
    } else {
      html_file_path = await generate_html_file(generationObject, generate_bon);
    }
    const pdf_file_path = await generate_pdf(html_file_path);
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      pdf_file_path
    );
    // TODO: GENERATE2

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: req.body.email,
      subject: "Bon de réservation",
      attachments: [
        {
          filename: "Receipt.pdf",
          path: pdf_file_path,
        },
      ],
    };

    sendEmailWithForVoucher(emailData);

    const newVoucher = new Booking({
      nuits,
      paidAgency,
      nomHotel,
      tel,
      num: numero + total,
      date_départ: dateD,
      date_arrivée: arrive,
      Cin,
      email,
      rooms,
      name,
      price,
      pdfUrl: secure_url,
      pdfId: public_id,
      message,
      occupation,
      logement,
    });

    const response = await newVoucher.save();

    return res.status(200).send({ message: "Ajouté avec succées", response });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
