require("dotenv").config();
const express = require("express");
const cors = require("cors");
const startServer = require("./app");
const connectDB = require("./Config/Connection");
const app = express();

const PORT = process.env.PORT || 3000;

(async () => {
    await connectDB();
    const app = await startServer();

    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    })
})()