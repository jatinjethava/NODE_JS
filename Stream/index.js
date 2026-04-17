const express = require('express')
const status = require("express-status-monitor");
const app = express()
const { createReadStream, createWriteStream } = require("fs");
const path = require("path");
const port = 3000

const inputFile = path.join(__dirname, "simple.txt");
const outputFile = path.join(__dirname, "copy.txt");

const readStream = createReadStream(inputFile, {
    encoding: "utf-8",
    highWaterMark: 16 * 1024
});

const writeStream = createWriteStream(outputFile);

readStream.on("data", (chunk) => {
    console.log("chunk received :", chunk);
    console.log("Buffer :", Buffer.from(chunk));
    writeStream.write(chunk);
});

writeStream.on("finish", () => {
    console.log("file copy completed");
});

app.use(status());

app.get('/', (req, res) => {
    fs.readFile("./simple.txt", (err, file) => {
        if (err) {
            res.send("sorry file is not found");
        }
        console.log("file show in browser");
        res.end(file);
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))