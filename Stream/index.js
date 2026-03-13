const express = require('express')
const status = require("express-status-monitor");
const app = express()
const fs = require("fs");
const path = require("path");
const port = 3000

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