require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT;
const { Server } = require('socket.io');
const Task = require('./models/task');
const http = require('http');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.set('io', io);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend listening on port ${PORT}`);
});