const express = require("express");
const cors = require("cors");
const router = express.Router();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.json({ message: "API is running" });
});

module.exports = app;