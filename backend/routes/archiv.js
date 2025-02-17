const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const jsonwebtoken = require("jsonwebtoken");

const prisma = new PrismaClient();

router.post("/archivCreate", async (req, res) => {
  const token = req.body.token || req.headers.authorization.split(' ')[1];
  const decodedToken = jsonwebtoken.decode(token);

  if (!decodedToken) {
    console.error("Token konnte nicht decodiert werden");
    return res.status(401).json({ message: "Token ist ungültig" });
  }

  console.log("decodedToken", decodedToken);
  console.log("decodedToken email", decodedToken.email);

  const user = await prisma.Users.findUnique({
    where: {
      email: decodedToken.email,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // const archiv = await prisma.userArchiv.findUnique({
  //   where: {
  //     userId: user.id,
  //   },
  // });
  const archiv = false;

  const date = new Date();

  if (archiv) {
    res.status(401).send({ message: "Archiv already exists" });
  } else {
    await prisma.userArchivs.create({
      data: {
        name: date.toString(),
        date: new Date(),
        userId: user.id,
      },
    });
    res.status(202).send({ message: "Archiv created" });
  }
});

router.post("/archiv", async (req, res) => {
  const token = req.body.token || req.headers.authorization.split(' ')[1];
  const decodedToken = jsonwebtoken.decode(token);

  if (!decodedToken) {
    console.log(decodedToken);
    console.error("Archiv Page: Token konnte nicht decodiert werden");
    return res.status(401).json({ message: "Token ist ungültig" });
  }

  //console.log("archiv decodedToken", decodedToken);

  const user = await prisma.Users.findUnique({
    where: {
      email: decodedToken.email,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  //console.log("archiv user", user);

  const archiv = await prisma.UserArchivs.findMany({
    where: {
      userId: user.id,
    },
  });
  //console.log(archiv);

  if (archiv.length === 0) {
    return res.status(200).json({ message: "No archiv found" });
  }

  res.status(200).send({ archiv });
});

module.exports = router;