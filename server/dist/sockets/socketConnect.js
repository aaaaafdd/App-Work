"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketConnect = socketConnect;
const socketRoom_1 = require("./socketRoom");
const socketUser_1 = require("./socketUser");
function socketConnect(io) {
    io.on('connection', (socket) => {
        (0, socketRoom_1.socketRoom)(socket, io);
        (0, socketUser_1.socketUser)(socket, io);
        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id);
        });
    });
}
