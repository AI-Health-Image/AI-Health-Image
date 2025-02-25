//Upload.js
const express = require("express");
const router = express.Router();
const multer = require("multer"); // Middleware für Ddatei-Upload
const {PrismaClient} = require("@prisma/client");
const jsonwebtoken = require("jsonwebtoken");
const authenticateToken = require("../src/authenticateToken");

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

router.post("/upload", authenticateToken, upload.single("image"), async (req, res) => {
  //console.log("eq.file", req.file);
  if (!req.file) {
    return res.status(400).json({ message: "Kein Bild hochgeladen" });
  }

  /*
  const token = req.body.token || req.headers.authorization.split(' ')[1];
  const decodedToken = jsonwebtoken.decode(token, (err, decoded) => {
    if (err) {
      console.error("Token konnte nicht decodiert werden", err);
      return res.status(401).json({ message: "Token ist ungültig" });
    }
  });
  console.log("decodedToken", decodedToken);
  console.log("decodedToken email", decodedToken.email);
  */
  
  const user = await prisma.users.findUnique({
    where: {
      email: req.user.email,
    },
  });

  console.log("user", user);

  const archiv = '';
  
  if(archiv) {

    await  prisma.UserUploads.create({
      data: { 
        userId: user.id,  //ID des Users, der das Bild hochgeladen hat
        uploadedFilname: req.file.filename,  //Dateiname des hochgeladenen Bildes
        archivId: archiv.id
      },
    });
  } else {
    const date = new Date(); 
    const archiv = await prisma.userArchivs.create({
      data: {
        name: date.toString(),
        date: date,
        userId: user.id,
      },
    });

    await  prisma.userUploads.create({
      data: { 
        userId: user.id,  //ID des Users, der das Bild hochgeladen hat
        uploadedFilname: req.file.filename,  //Dateiname des hochgeladenen Bildes
        archivId: archiv.id
      },
    });
  }

  //Hier wird das hochgeladene Bild weierverarbeitet (z.B. an das ML-Tool senden)
  console.log("Datei hochgeladen:", req.file.path);

  res.json({ message: "Bild erfolgreich hochgeladen" });


});

module.exports = router;
