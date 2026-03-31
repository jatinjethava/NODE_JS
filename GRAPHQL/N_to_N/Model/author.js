const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    Author_Name: { type: String }
}, { timestamp: true });

const Author = mongoose.model("Author", Schema);
module.exports = {
    Author,
}