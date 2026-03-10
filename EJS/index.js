const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function ConnectDB(url) {
    try {
        await mongoose.connect(url);
        console.log("database connected successfully");
    } catch (error) {
        console.log(error);
    }
}
ConnectDB("mongodb://localhost:27017/NODE_JS");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const Data = {
    "name": "jatin jethava",
    "age":21,
    "mo_number":8160082638
}

app.get("/", (req, res) => {
    return res.render('home', {
        data: Data,
    });
})

app.listen(8100, () => {
    console.log(`http://localhost:8100`);
})
