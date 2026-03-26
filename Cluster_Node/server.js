const express = require('express')
const cluster = require("cluster");
const os = require("os");

const cpu = os.cpus().length;

if (cluster.isPrimary) {
    for (let i = 0; i <= cpu; i++) {
        cluster.fork();
    }
} else {
    const app = express()
    const port = 8100

    app.get('/', (req, res) => {
        res.send(`Hello World ${process.pid}!`)
    })
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}