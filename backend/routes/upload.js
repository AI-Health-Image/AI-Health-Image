//Upload.js
const express = require("express");
const router = express.Router();
const multer = require("multer"); // Middleware für Ddatei-Upload
const {PrismaClient} = require("@prisma/client");

//Prisma-Client initialisieren
const prisma = new PrismaClient();

//Konfiguration für den Datei-Upload
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    //console.log("destination", file);
    cb(null, "./data/upload"); //Speicherort für hochgeladene Bilder
  },

  filename: (req, file, cb) => {
    //console.log("filename", file);
    cb(null, `image-${Date.now()}.${file.originalname}`);
  },
});

//API Endpunkt für den Bild-Upload

const upload = multer({ storage: imageStorage });

router.post("/upload", upload.single("image"), async (req, res) => {
  //console.log("eq.file", req.file);
  if (!req.file) {
    return res.status(400).json({ message: "Kein Bild hochgeladen" });
  }

  await  prisma.UserUploads.create({
    data: {
      filename: req.file.filename,  //Dateiname des hochgeladenen Bildes
    },
  });

  //Hier wird das hochgeladene Bild weierverarbeitet (z.B. an das ML-Tool senden)
  console.log("Datei hochgeladen:", req.file.path);

  res.json({ message: "Bild erfolgreich hochgeladen" });


});

module.exports = router;
