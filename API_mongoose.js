const express = require('express');
require('./connection_mongoose').connectDB();
const { User } = require('./schema_model_mongoose');
const app = express();
const port = 8100;
app.use(express.json());
// middleware for check data is json or not

app.get('/get_data', async (req, res) => {
    const result = await User.find();
    res.send(result);
    res.end();
});

app.post('/create', async (req, res) => {
    const data = new User(req.body);
    const result = await data.save();
    res.send('data saved successfully');
});

app.put('/:id', async (req, res) => {
    const result = await User.updateOne({ _id: req.params.id }, { $set: req.body });
    res.send('data updated successfully');
});

app.delete('/:id', async (req, res) => {
    const result = await User.deleteOne({ _id: req.params.id });
    res.send(`Number of documents deleted: ${result.deletedCount}`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});