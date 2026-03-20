const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Change 'YOUR_SECRET_KEY' to a long random string
const SECRET_KEY = "MySuperSecretKey123";

app.get("/", (req, res) => {
    // Check if the Roblox request has the correct key
    if (req.headers['x-api-key'] !== SECRET_KEY) {
        return res.status(403).send("Unauthorized Access");
    }
    res.json({ reading: "Your server is connected to Roblox!" });
});

app.get("/ping", (req, res) => res.status(200).send("OK"));

app.listen(port, () => console.log(`Server running on port ${port}`));
