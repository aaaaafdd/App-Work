import { NextFunction } from 'express';
import { verifyToken } from "../utils/authFunctions";
import {Socket} from 'socket.io'

interface SocketWithUser extends Socket {
    user?: any; 
}

export function socketAuth(io: any){
    io.use((socket: SocketWithUser, next: NextFunction) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            io.emit('unauthorized', {message: "no token provided"})
            console.log('error: no hay token')
            return;
        } 
        try {
            const decoded = verifyToken(token);
            socket.user = decoded; // Attach the user to the socket object
            next()
        } catch(error){
            socket.emit('unauthorized', {message: "invalid token"})
            return;
        }
    })
}