const express = require('express');
const db_connection = require('./database_connection');
const app = express();
const port = 8100;
app.use(express.json());
// middleware for check data is json or not 

app.get('/', async (req, res) => {
    let db = await db_connection();
    let result = await db.find().toArray();
    console.log(result);
    res.send(result);
});

app.post('/', async (req, res) => {
    let db = await db_connection();
    let result = await db.insertOne(req.body);
    res.send(req.body);
});

app.put('/', async (req, res) => {
    let db = await db_connection();
    let result = await db.updateOne(req.body);
    res.send(req.body);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});