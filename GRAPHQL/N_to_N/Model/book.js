const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    Book_Name: { type: String },
    Author_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },
    categoryIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }]
}, { timestamp: true });

const Book = mongoose.model("Book", Schema);
module.exports = {
    Book,
}