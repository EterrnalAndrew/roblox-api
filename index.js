const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // Render provides the port automatically

app.get("/", (req, res) => {
    res.json({ reading: "Your server is connected to Roblox!" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
