const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    mobile_no: { type: Number },
}, { timestamp: true });

const USER = mongoose.model("Users", Schema);
module.exports = {
    USER,
}