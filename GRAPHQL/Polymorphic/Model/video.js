const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    title: { type: String },
    url: { type: String },
}, { timestamp: true });

const VIDEO = mongoose.model("Video", Schema);
module.exports = {
    VIDEO,
}