const express = require("express");
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const jsonwebtoken = require("jsonwebtoken");

const prisma = new PrismaClient();

router.post("/archivCreate", async (req, res) => {

    const token = req.body.token || req.headers.authorization.split(' ')[1];
    const decodedToken = jsonwebtoken.decode(token, (err, decoded) => {
      if (err) {
        console.error("Token konnte nicht decodiert werden", err);
        return res.status(401).json({ message: "Token ist ungültig" });
      }
    });
    console.log("decodedToken", decodedToken);
    console.log("decodedToken email", decodedToken.email);

  const archiv = await prisma.UserArchivs.findUnique({
      where:{
        email: decodedToken.email,
      }
    });

    const user = await prisma.users.findUnique({
      where: {
        email: decodedToken.email,
      },
    });

    if(archiv){
      res.status(401).send({ message: "Archiv already exists" });
    } else if(!archiv){
      await prisma.UserArchivs.create({
        data: {
          name: Date.now(),
          date: Date.now(),
          userId: user.id,
        },
      });
      res.status(202).send({ message: "Archiv created"});
    } else {
      res.status(500).send({ message: "Error"});
    };

});


router.post("/archiv",async (req, res) => {
  const token = req.body.token || req.headers.authorization.split(' ')[1];
  const decodedToken = jsonwebtoken.decode(token, (err) => {
    if (err) {
      console.error("Token konnte nicht decodiert werden", err);
      return res.status(401).json({ message: "Token ist ungültig" });
    }
  });
  console.log("archiv decodedToken", decodedToken);

  const user = await prisma.users.findUnique({
    where: {
      email: decodedToken.email,
    },
  });

  if(!user){
    return res.status(404).json({message:"user not found"})
  }

     archiv = await prisma.UserArchivs.findMany({
      where:{
        userId: user.id, 
      }
    });

  console.log( archiv);

  res.send({ archiv });
});

module.exports = router;
