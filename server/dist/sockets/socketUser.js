"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketUser = socketUser;
function socketUser(socket, io) {
    socket.on('add_contact', () => {
        io.emit('update_contact');
    });
    socket.on('register_user', (userId) => {
        console.log('Register user escuchado', userId);
        socket.userId = userId;
        socket.join(userId);
    });
}
