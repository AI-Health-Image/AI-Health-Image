// Common JS module
const express = require('express');
const cors = require('cors');
const authRouter = require("./routes/auth");

// Initialisierung von Express
const app = express();
const port = process.env.PORT || 3000;

// CORS Optionen (Cross-Origin Resource Sharing)
const corsOptions = {
    origin: ["http://localhost:5173"],
};

// Middleware für Form Data
app.use(cors(corsOptions));
app.use(express.json());

// Initialisieren der Grund Route
app.get("/", (request, response) => {
    response.send("Nothing to see - go away!");
});

// Auth Route
app.use("/auth", authRouter);

// Upload Route
app.use("/upload", uploadRouter);

// Server wird gestartet auf die Variable Port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});