const mongoos = require("mongoose");

const userSchema = new mongoos.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

const User = mongoos.model("Auth_User", userSchema)
module.exports = User;