
const { Server } = require('socket.io');

let io;

const initSocket = (server) => {
    io = new Server(server);
    io.on('connection', (socket) => {
        console.log('a user connected by id: ' + socket.id);
    });
};

const getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};

module.exports = { initSocket, getIo };
