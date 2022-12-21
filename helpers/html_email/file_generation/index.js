const getPDF = require("../../getPDFFile");
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

async function generate_pdf(html_file) {
  //create a pdf using getpdf helper method from the html  file
  const pdf = await getPDF(`http://localhost:5001/${html_file}`);
  //generate path for the pdf
  const path = `generatedPDF/pdf${crypto.randomUUID()}.pdf`;
  console.log(pdf.toString());
  //write the pdf to the exact path
  await fs.writeFileSync(path, pdf);
  return path;
}

async function generate_html_file(html_props, html_generate_method) {
  //pass the voucher object to the template
  const html_text = html_generate_method(html_props);
  //html file name
  const html_filename = `html${crypto.randomUUID()}.html`;
  console.log(__dirname);
  //create path name for the file
  const html_file_path = path.join(
    // "/usr/src/app" in docker conrainer
    `generatedHTML`,
    html_filename
  );
  //write the html file to the exact path
  await fs.writeFileSync(html_file_path, html_text);
  return html_filename;
}

module.exports = { generate_html_file, generate_pdf };
