const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

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

router.get('/api/analyse/:id', async (req, res) => {
    const { id } = req.params;
    const archiveId = parseInt(id);
    const files = await prisma.userUploads.findMany({
        where: {
            archivId: archiveId,
        },
    });
    console.log(files);

    const brain = spawn('../ki-modell/venv/bin/python', ['../ki-modell/brain.py', files[0].uploadedFilname]);
    console.log(brain);
    const result = await new Promise((resolve, reject) => {
        brain.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        brain.on('exit', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve(code);
        });
    });
    console.log(result);

    res.json({ data: files });
});

// Separate route for serving files
router.get('/output/:filename', (req, res) => {
    const filePath = path.resolve('./data/output', req.params.filename);
    console.log(filePath);
    if (!fs.existsSync(filePath)) {
        return res.status(201).send('File not found');
    }
    res.sendFile(filePath);
});

module.exports = router;
