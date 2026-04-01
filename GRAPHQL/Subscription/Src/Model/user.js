const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    }
}, { timestamps: true });

const SUBSCRIPTION = mongoose.model('Subscription', userSchema);
module.exports = SUBSCRIPTION;

