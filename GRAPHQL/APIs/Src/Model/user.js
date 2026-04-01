const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    }
}, { timestamps: true })

const USER = mongoose.model("userApi", userSchema);
module.exports = USER;