const express = require('express');
const app = express();
const port = 8100;

app.get('', (req, res) => {
    res.send('Hello World!');
});

app.get('/about', (req, res) => {
    res.send('this is about page!');
});

app.get('/contact', (req, res) => {
    res.send('this is contact page!');
});

app.get('/service', (req, res) => {
    res.send('this is service page!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});