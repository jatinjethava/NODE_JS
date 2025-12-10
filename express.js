const express = require('express');
const app = express();
const port = 8100;

app.get('', (req, res) => {
    res.send(`<h1>Hello , ' ${req.query.name} ' welcome to my first express app </h1>
        <a href="/about">about</a><br>
        <a href="/contact">contact</a><br>
        <a href="/service">service</a>
    `);
});

app.get('/about', (req, res) => {
    res.send({
        name: 'Jatin Jethava',
        age: 20,
        city: 'Surat'
    });
});

app.get('/contact', (req, res) => {
    res.send(`this is contact page!
        <br>
        <a href="/">Go To Home</a>
    `);
});

app.get('/service', (req, res) => {
    res.send(`this is service page!
         <br>
        <a href="/">Go To Home</a>
        `);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});