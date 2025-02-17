const router = express.Router();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
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

route.get('/api/image/:filename', async (req, res) => {
    const { filename } = req.params.filename;
    res.sendFile(--dirname + `/data/upload/${filename}`);
});

module.exports = router;
