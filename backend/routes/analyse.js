const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const { spawn } = require('child_process');

router.get('/api/image/:id', async (req, res) => {
    const { id } = req.params;
    const archiveId = parseInt(id);
    const files = await prisma.userUploads.findMany({
        where: {
            archivId: archiveId,
        },
    });
    res.json({ data: files });
});

router.get('/uploads/:id', async (req, res) => {
    const imageId = parseInt(req.params.id);
    const imageData = await prisma.userUploads.findUnique({
        where: {
            id: imageId,
        },
    });
    const filePath = path.resolve('./data/upload', imageData.uploadedFilname);
    res.sendFile(filePath);
});

router.get('/api/analyse/:filename', async (req, res) => {
    const filename = req.params.filename;
    //console.log('Filename:', filename);
    const file = await prisma.userUploads.findFirst({
        where: {
            uploadedFilname: filename,
        },
    });
    //console.log(file);

    const user = await prisma.users.findUnique({
        where: {
            id: file.userId,
        },
    });
    //console.log('User:', user);

    const brain = spawn('../ki-modell/venv/scripts/python', ['../ki-modell/brain.py', file.uploadedFilname]);
    let resultData = '';

    brain.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        resultData += data.toString();
    });

    await new Promise((resolve, reject) => {
        brain.on('exit', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve(code);
        });
    });
    //console.log(resultData);

    const date = new Date();
    //console.log('archiveId:', file.archivId, 'Uploaded Filename:', file.uploadedFilname, 'User Id:', user.id, 'User Email:', user.email, 'Result:', resultData, 'Date:', date);
    await prisma.analysedUserUploads.create({
        data: {
            uploadedFilname: file.uploadedFilname,
            userId: user.id,
            analysed: true,
            result: resultData,
            date: date,
            archivId: file.archivId,
        },
    });

    res.json({ data: file.uploadedFilname });
});

router.get('/output/:filename', async (req, res) => {
    const fileName = req.params.filename;
    //console.log('output filename:', fileName);
    const imageData = await prisma.analysedUserUploads.findFirst({
        where: {
            uploadedFilname: fileName,
        },
    });
    //console.log('ImageData:', imageData);
    if (!imageData) {
        return res.status(204).send('No database entry found');
    }
    const filePath = path.resolve('./data/output', imageData.uploadedFilname);
    //console.log(filePath);
    /*
    if (!fs.existsSync(filePath)) {
        return res.status(204).send('File not found');
    }*/
    //console.log('File sended');
    res.sendFile(filePath);
});

router.get('/output/verify/:filename', async (req, res) => {
    const fileName = req.params.filename;
    //console.log('Filename:', fileName);
    const verifiedImage = await prisma.analysedUserUploads.findFirst({
        where: {
            uploadedFilname: fileName,
        },
    });
    //console.log('verifiedImage:', verifiedImage);
    if (!verifiedImage) {
        return res.status(204).send('No database entry found');
    }
    if (verifiedImage.result === '0') {
        return res.status(204).send('No result found');
    }

    const filePath = (verifiedImage.uploadedFilname);

    res.send(filePath);
});

module.exports = router;