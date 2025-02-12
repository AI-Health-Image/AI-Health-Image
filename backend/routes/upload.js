//Upload.js
const express = require("express");
const multer = require("multer"); // Middleware für Ddatei-Upload
const router = require("./auth");
const app = express();
const port = 3000;

//Konfiguration für den Datei-Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); //Speicherort für hochgeladene Bilder
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); //Eindeutiger Dateiname
  },
});

const upload = multer({ storage: storage });

//API Endpunkt für den Bild-Upload
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Kein Bild hochgeladen" });
  }

  //Hier wird das hochgeladene Bild weierverarbeitet (z.B. an das ML-Tool senden)
  console.log("Datei hochgeladen:", req.file.path);

  res.json({ message: "Bild erfolgreich hochgeladen" });

  app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
  });
});

module.exports = router;
