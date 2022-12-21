//a tool that provides controll over chrome to allow html conversion to pdf
const puppeteer = require("puppeteer");

//convert html to pdf
async function getPDF(html_file_path) {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: true,
    args: [
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ],
  });

  const page = await browser.newPage();

  await page.goto(`${html_file_path}`, {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({ format: "A4" });

  await browser.close();
  return pdf;
}

module.exports = getPDF;
