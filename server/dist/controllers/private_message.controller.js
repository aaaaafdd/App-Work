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
exports.sendPrivateMessage = sendPrivateMessage;
exports.getPrivateChat = getPrivateChat;
const sequelize_1 = require("sequelize");
const relations_1 = require("../models/relations");
function sendPrivateMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { senderId, receiverId, content } = req.body;
        try {
            const message = yield relations_1.PrivateMessage.create({ senderId, receiverId, content });
            res.status(201).json(message);
        }
        catch (error) {
            res.status(500).json({ error: 'Error sending message' });
        }
    });
}
function getPrivateChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId1, userId2 } = req.params;
        try {
            const messages = yield relations_1.PrivateMessage.findAll({
                where: {
                    [sequelize_1.Op.or]: [
                        { senderId: userId1, receiverId: userId2 },
                        { senderId: userId2, receiverId: userId1 }
                    ]
                },
                order: [['createdAt', 'ASC']],
                include: [{
                        model: relations_1.User,
                        as: 'receivedUser',
                        attributes: ['id', 'username'],
                    }, {
                        model: relations_1.User,
                        as: 'sentUser',
                        attributes: ['id', 'username'],
                    }],
            });
            res.status(200).json({ status: 'success', messages });
        }
        catch (error) {
            console.log('error');
            res.status(500).json({ status: 'error', error: 'Error fetching chat' });
        }
    });
}
