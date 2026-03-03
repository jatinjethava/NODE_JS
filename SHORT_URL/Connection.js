const mongoose = require("mongoose");

async function ConnectDB(url) {
    try {
        await mongoose.connect(url);
        console.log("database connected successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { ConnectDB };