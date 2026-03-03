const express = require('express');
const app = express();
const port = 8100;
const middleware1 = require('./Middleware1'); // import from other file
const route = express.Router();

route.use(middleware1);

// Middleware function to check age for all routes
// Application Level Middleware
const middleware = (req, res, next) => {
    // console.log(`middleware executed.`);
    if (!req.query.age && !req.query.age < 18) {
        res.send('give me age in url.');
    } else if (req.query.age < 18) {
        res.send('You are not allowed to access this page.');
    } else {
        next();
    }
}

// single route level middleware
app.get('/', middleware1, (req, res) => {
    console.log(req.headers);

    // for better practice always use X for built In header
    res.setHeader("X-Name", "jatin jethava");
    res.send('Welcome to the Home Page');
});

app.get('/about', middleware, (req, res) => {
    res.send('This is the About Page');
});

route.get('/contact', (req, res) => {
    res.send('This is the Contact Page');
});

app.use('/', route);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});