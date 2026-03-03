const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    requireUrl: {
        type: String,
        required: true
    },
    visitHistory: [{ Timestamp: { type: Number } }],
})

module.exports = mongoose.model("URL", urlSchema);