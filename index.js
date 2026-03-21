const express = require("express");
const app = express();

// Render uses process.env.PORT (usually 10000). 
// This line ensures it works on Render AND your local computer.
const PORT = process.env.PORT || 3000;

app.use(express.json());

// CHANGE THIS: Keep it secret! 
// This must match the 'x-api-key' header you send from Roblox.
const SECRET_KEY = "MySuperSecretKey123";

// --- 1. PUBLIC PING ROUTE (FOR UPTIMEROBOT) ---
// Point UptimeRobot to: https://your-app.onrender.com
// This route does NOT require a key, so UptimeRobot will always see "OK".
app.get("/ping", (req, res) => {
    res.status(200).send("Server is awake!");
});

// --- 2. SECURE HOME ROUTE ---
app.get("/", (req, res) => {
    const apiKey = req.headers["x-api-key"];

    if (apiKey !== SECRET_KEY) {
        return res.status(403).json({ error: "Unauthorized Access" });
    }

    res.json({ message: "Your server is connected to Roblox!" });
});

// --- 3. SECURE SAVE DATA ROUTE ---
// In Roblox, use HttpService:PostAsync with the 'x-api-key' header.
app.post("/save-data", (req, res) => {
    const apiKey = req.headers["x-api-key"];

    if (apiKey !== SECRET_KEY) {
        return res.status(403).json({ error: "Unauthorized Access" });
    }

    const { username, score } = req.body;
    console.log(`Received: ${username} has ${score} points!`);

    res.json({ 
        success: true, 
        message: `Data for ${username} saved successfully.` 
    });
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Keep-alive URL: https://your-app-name.onrender.com`);
});
