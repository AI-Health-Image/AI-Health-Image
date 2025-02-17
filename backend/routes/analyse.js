const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
const path = require('path');



router.get('/api/image/:id', async (req, res) => {
    const { id } = req.params;
    const archiveId = parseInt(id);
    console.log(id);
    const files = await prisma.userUploads.findMany({
        where: {
            archivId: archiveId,
        },
    }); 
    console.log(files);
   

   res.json({ data: files });
});

// Separate route for serving files
router.get('/uploads/:filename', (req, res) => {
    const filePath = path.resolve('./data/upload', req.params.filename);
    res.sendFile(filePath);
});

module.exports = router;
