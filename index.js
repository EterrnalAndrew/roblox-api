const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Critical for reading Roblox data

const SECRET_KEY = "MySuperSecretKey123";

// 1. SECURE SAVE ROUTE
app.post("/save-data", (req, res) => {
    if (req.headers['x-api-key'] !== SECRET_KEY) {
        return res.status(403).send("Unauthorized Access");
    }
    const { username, score } = req.body;
    console.log(`Received: ${username} has ${score} points`);
    res.json({ message: "Data received!" });
});

// 2. SECURE HOME ROUTE
app.get("/", (req, res) => {
    if (req.headers['x-api-key'] !== SECRET_KEY) {
        return res.status(403).send("Unauthorized Access");
    }
    res.json({ reading: "Your server is connected to Roblox!" });
});

// 3. PUBLIC PING ROUTE (For UptimeRobot)
app.get("/ping", (req, res) => {
    res.status(200).send("OK");
});

// 4. START SERVER
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


