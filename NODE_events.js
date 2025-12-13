// What is an Event and Event Emitter in Node.js?
const express = require('express');
const EventEmitter = require('events'); // in built module
const app = express();
const port = 8100;
app.use(express.json());
const event = new EventEmitter();
let count = 0;
// Create an event listener
event.on('count', (name) => {
    count += 1;
    console.log(`Hello, ${name}! Welcome to Node.js Events.${count} time(s) visited.`);
});

app.get('/', (req, res) => {
    res.send('API colled!');
    event.emit('count', 'Jatin'); // emitting event
});

app.get('/search', (req, res) => {
    res.send('search colled!');
});

app.get('/update', (req, res) => {
    res.send('API colled!');
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})