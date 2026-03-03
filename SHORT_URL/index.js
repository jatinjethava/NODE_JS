const express = require("express");
const app = express();
const { ConnectDB } = require("./Connection");
const useUrl = require("./Routes/urlRoute");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

ConnectDB("mongodb://localhost:27017/NODE_JS");

app.use("/url", useUrl)

app.listen(8100, () => {
    console.log(`http://localhost:8100`);
})
