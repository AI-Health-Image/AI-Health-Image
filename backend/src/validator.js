const e = require("express");
const prisma = require("@prisma/client");

function validatorRegister(
    users,
    email,
    password,
    repeatPassword
) {
    // Error Handling
    let missingField = [];
    !users ? missingField.push("No Users found") : null;
    !email ? missingField.push("Missing Email") : null;
    !password ? missingField.push("Missing Password") : null;
    !repeatPassword ? missingField.push("Missing Repeat Password") : null;
    (password !== repeatPassword) ? missingField.push("Passwords do not match") : null;
    users.find((user) => user.email === email) ? missingField.push("Email already exists") : null;

    return {
        error: missingField.length > 0,
        message: missingField.join(", "),
    };
}

function validatorLogin(
    users,
    email,
    password,
    checkedPassword
) {
    // Error Handling
    let missingField = [];
    !users ? missingField.push("No Users found") : null;
    !email ? missingField.push("Missing Email") : null;
    !password ? missingField.push("Missing Password") : null;
    !users.find((user) => user.email === email) ? missingField.push("Email not found") : null;
    !checkedPassword ? missingField.push("Password incorrect") : null;

    return {
        error: missingField.length > 0,
        message: missingField.join(", "),
    };
}

module.exports = { validatorRegister, validatorLogin };
