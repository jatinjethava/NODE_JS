const express = require("express");
const mongoose = require("mongoose");
const UserRoutes = require("./Routes/user.route");
const app = express();
PORT = 8100

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function ConnectDB(url) {
    try {
        mongoose.connect(url);
        console.log("database connected");
    } catch (error) {
        console.log(error);
    }
}
ConnectDB("mongodb://localhost:27017/NODE_JS");

app.use("/api", UserRoutes);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})