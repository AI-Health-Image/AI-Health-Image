const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    //console.log(`authHeader: ${authHeader}`);

    const token = authHeader && authHeader.split(' ')[1];
    //console.log(`Token: ${token}`);

    if (token == null) return res.status(401).send({ message: "Token is missing", verified: false });

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) {
            console.log('Error:', err);
            return res.status(403).send({ message: "Token is invalid", verified: false });
        }

        const userEmail = user.email.toString();
        //console.log('userEmail:', userEmail);

        const userVerify = await prisma.users.findUnique({
            where: {
                email: userEmail,
            },
        });
        //console.log('userVerify:', userVerify, 'End of userVerify');

        if (!userVerify) return res.status(404).send({ message: "User not found", verified: false });

        //console.log('user:', user);
        req.user = user;

        next();
    });
};

module.exports = authenticateToken;