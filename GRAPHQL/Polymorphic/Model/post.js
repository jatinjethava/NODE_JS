const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
}, { timestamp: true });

const POST = mongoose.model("Post", Schema);
module.exports = {
    POST,
}