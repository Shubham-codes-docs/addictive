const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
dotenv.config();
const { v4: uuidv4 } = require("uuid");

const formRoute = require("./routes/form");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(__dirname);
app.use("/files", express.static(path.join(__dirname, "data")));
const filefilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest = fs.existsSync("data/files")
      ? "data/files"
      : fs.mkdirSync("data/files", { recursive: true }, (err) => {
          console.log(err);
        });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const upload = multer({ storage: diskStorage, fileFilter: filefilter }); // using multer to upload a multiple files
app.post("/api/upload", upload.single("file"), (req, res, next) => {
  if (!req.file) {
    return res.status(200).json({ msg: "No file Chosen" });
  }
  res.status(201).json({
    msg: "File Uploaded",
    path: req.file.path.replace(/\\/g, "/"),
    success: true,
  });
});

//routes
app.get("/", (req, res) => {
  res.send("working");
});

app.use("/api", formRoute);

//listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Backend is running on port ${port}`));
