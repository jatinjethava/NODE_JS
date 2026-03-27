const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    Book_Name: { type: String },
    Author_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },
    Author_Name: { type: String }
}, { timestamp: true });

const Book = mongoose.model("Book", Schema);
module.exports = {
    Book,
}