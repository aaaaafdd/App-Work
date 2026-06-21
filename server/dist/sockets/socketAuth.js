"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketAuth = socketAuth;
const authFunctions_1 = require("../utils/authFunctions");
function socketAuth(io) {
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            io.emit('unauthorized', { message: "no token provided" });
            console.log('error: no hay token');
            return;
        }
        try {
            const decoded = (0, authFunctions_1.verifyToken)(token);
            socket.user = decoded; // Attach the user to the socket object
            next();
        }
        catch (error) {
            socket.emit('unauthorized', { message: "invalid token" });
            return;
        }
    });
}
