const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/formatMessage');
const { userJoin } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// run when client connects
io.on('connection', socket => {
    console.log('New WS Connection...')

    // joinBranch
    socket.on('joinBranch', ({ username, branch }) => {
        const user = userJoin(socket.id, username, branch);

        console.log(user)

        socket.join(user.branch);

        const branchUsers = user.branch;

        // Send users and room info
        io.to('Bandung').emit("message", "Halo ini dari Bandung");

        // Broadcast when a user connects
        socket.broadcast
            .to(user.branch)
            .emit('message', formatMessage('ChatBot Admin', `${user.username} has joined the chat`));

        // Runs when client disconnects
        socket.on('disconnect', () => {
            io.emit('message', formatMessage('ChatBot Admin', `${user.username} has left the chat`));
        });

    });

    socket.emit('message', formatMessage('ChatBot Admin', 'Welcome to ChatCord'));


})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))