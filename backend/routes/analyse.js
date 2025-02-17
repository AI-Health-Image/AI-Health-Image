const express = require('express');
const router = express.Router();
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './data/upload');
    },
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}.${file.originalname}`);
    },
});

const upload = multer({ storage: imageStorage });

router.get('/api/image/:id', async (req, res) => {
    const { id } = req.params.id;
    const files = prisma.userUploads.findMany({
        where: {
            archivId: id,
        },
    }); 
    console.log(files);
    res.sendFile(--dirname + `/data/upload/${id}`);
});

module.exports = router;
