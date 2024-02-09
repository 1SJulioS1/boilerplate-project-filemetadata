var express = require("express");
var cors = require("cors");
const { connectToDatabase } = require("./config/dbConn.js");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

require("dotenv").config();

var app = express();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No se ha seleccionado ningún archivo");
  }
  const fileInfo = {
    name: req.file.originalname,
    size: req.file.size,
    type: req.file.mimetype,
  };

  res.json(fileInfo);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
