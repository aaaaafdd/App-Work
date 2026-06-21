"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketRoom = socketRoom;
const relations_1 = require("../models/relations");
function socketRoom(socket, io) {
    socket.on('join_room', (roomId, roomName) => {
        socket.join(roomId);
        io.emit('room_created', roomId);
    });
    socket.on('leave_room', (roomId, userId) => {
        socket.leave(roomId);
    });
    socket.on('created_room', () => {
        io.emit('room_created');
    });
    socket.on('send_message', (messageData) => __awaiter(this, void 0, void 0, function* () {
        const { roomId, content, senderId, isPrivate, receiverId, username } = messageData;
        if (isPrivate) {
            yield relations_1.PrivateMessage.create({ senderId, receiverId: receiverId, content });
        }
        else {
            yield relations_1.RoomMessage.create({ senderId, roomId, content });
        }
        io.to(roomId).emit('receive_message', {
            content,
            username,
            senderId,
            isPrivate,
        });
    }));
}
