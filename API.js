const express = require('express');
const db_connection = require('./database_connection');
const { ObjectId } = require('mongodb');
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
    res.send(result);
});

app.put('/:id', async (req, res) => {
    let db = await db_connection();
    let result = await db.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
    res.send(result);
});

app.delete('/:id', async (req, res) => {
    let db = await db_connection();
    let result = await db.deleteOne({ _id: new ObjectId(req.params.id) });
    res.send(`Number of documents deleted: ${result.deletedCount}`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});