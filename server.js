//including express to our project
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/ConnectDB");
//requiring dotenv to access environment varaibles
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;

//instanciating express
const app = express();
//connecting to DB
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());

// router

app.use("/api/", require("./routes/hotel"));
app.use("/api/", require("./routes/country"));
app.use("/api/", require("./routes/reservation"));
app.use("/api/user", require("./routes/user"));
app.use("/api/org", require("./routes/org"));
app.use("/api/", require("./routes/booking"));
app.use(express.static("generatedHTML"));

// linkin the server to the port
app.listen(PORT, async (err) => {
  err ? console.error(err) : console.log("server is running!!", PORT);
});
