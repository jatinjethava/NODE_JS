const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    Category: { type: String },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    }
}, { timestamp: true });

const Category = mongoose.model("Category", Schema);
module.exports = {
    Category,
}