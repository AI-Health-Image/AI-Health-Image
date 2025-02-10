const e = require("express");
const prisma = require("@prisma/client");

function validatorRegister(
    users,
    username,
    password,
    repeatPassword
) {
    // Error Handling
    let missingField = [];
    !users ? missingField.push("No Users found") : null;
    !username ? missingField.push("Missing Username") : null;
    !password ? missingField.push("Missing Password") : null;
    !repeatPassword ? missingField.push("Missing Repeat Password") : null;
    (password !== repeatPassword) ? missingField.push("Passwords do not match") : null;
    users.find((user) => user.username === username) ? missingField.push("Username already exists") : null;

    return {
        error: missingField.length > 0,
        message: missingField.join(", "),
    };
}

function validatorLogin(
    users,
    username,
    password,
    checkedPassword
) {
    // Error Handling
    let missingField = [];
    !users ? missingField.push("No Users found") : null;
    !username ? missingField.push("Missing Username") : null;
    !password ? missingField.push("Missing Password") : null;
    !users.find((user) => user.username === username) ? missingField.push("Username not found") : null;
    !checkedPassword ? missingField.push("Password incorrect") : null;

    return {
        error: missingField.length > 0,
        message: missingField.join(", "),
    };
}

module.exports = { validatorRegister, validatorLogin };
