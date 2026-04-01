const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userApi",
        required: true
    }
}, { timestamps: true })

const POST = mongoose.model("postApi", postSchema);
module.exports = POST;