const express = require('express');
const router = express.Router();

const validator = require('../src/validator');
const {PrismaClient} = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = 'secretToken';

// Prisma Client wird initialisiert
const prisma = new PrismaClient();

// Login Route
router.post("/login", async (request, response) => {
    const { email, password } = request.body;
    console.log(`Login attempt with email: ${email} and password: ${password}`);
    // Datenbankabfrage
    const users = await prisma.users.findMany();
    console.log('users: ', users);

    // Validiert ob ein User existiert
    const existingUser = users.find((user) => user.email === email);
    console.log('existingUser: ', existingUser);
    if (!existingUser) {
        response.status(401).send({ message: "User not found" });
        return;
    };
    // Validiert ob das Passwort übereinstimmt
    const checkedPassword = await bcrypt.compare(password, existingUser.password);
    
    // Validiert ob ein Error besteht
    const errorChecker = validator.validatorLogin(users, email, password, checkedPassword);
    //console.log(errorChecker);

    // Error Response
    if (errorChecker.message.length > 0) {
        response.status(401).send(errorChecker);
        return;
    };

    // Response
    if (users.find((user) => user.email === email && checkedPassword === true)) {
        // JWT Token wird erstellt
        const role = users.find((user) => user.email === email).role;
        const token = jwt.sign({ email, role }, SECRET);
        response.send({ message: "Login successful!", token });
        return;
    };
});

// Register Route
router.post("/register", async (request, response) => {
    const { email, password, repeatPassword } = request.body;
    console.log(`Register attempt with email: ${email} and password: ${password} and repeatPassword: ${repeatPassword}`);
    // Datenbankabfrage
    const users = await prisma.users.findMany();
    console.log(users);

    // Validiert ob ein Error besteht
    const errorChecker = validator.validatorRegister(users, email, password, repeatPassword);
    //console.log(errorChecker);

    // Error Response
    if (errorChecker.message.length > 0) {
        response.status(401).send(errorChecker);
        return;
    };

    // Response
    try {
        // Hier wird der User registriert
        console.log('Registering user');
        const hashPassword = bcrypt.hashSync(password, 10);
        await prisma.users.create({
            data: {
                email: email,
                password: hashPassword,
                role: 'patient'
            }
        });
        // Response vom Server (Registrierung erfolgreich)
        response.status(201).send({ message: "Registration successful!"});
        return;
    } catch (e) {
        // Error Response vom Server (Registrierung fehlgeschlagen)
        console.log(e);
        response.status(500).send({ message: "Registration failed" });
    };
});

module.exports = router;