const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    content: { type: String },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    commentType: {
        type: String,
        enum: ["Post", "Video"],
        required: true
    }
}, { timestamp: true });

const COMMENTS = mongoose.model("Comments", Schema);
module.exports = {
    COMMENTS,
}