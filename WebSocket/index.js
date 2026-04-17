const express = require('express');
const cors = require("cors");
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

const port = 8100;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Public'));

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/Public/index.html');
});

io.on('connection', (socket) => {
    console.log('connected: ' + socket.id);
    socket.on('disconnect', () => {
        console.log('disconnected', + socket.id);
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

server.listen(port, () => console.log(`Server listening on port ${port}!`));
