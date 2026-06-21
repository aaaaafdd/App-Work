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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = createRoom;
exports.getAllRooms = getAllRooms;
exports.joinRoom = joinRoom;
const sequelize_1 = require("sequelize");
const relations_1 = require("../models/relations");
const database_1 = __importDefault(require("../database/database"));
function createRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id_admin, roomName, description } = req.body;
        try {
            if (!id_admin) {
                res.status(400).json({ status: 'error', error: 'id_admin is required' });
                return;
            }
            const roomCreated = yield relations_1.Room.create({
                id_admin: id_admin,
                roomName: roomName,
                description: description
            });
            yield roomCreated.addUser(id_admin);
            res.status(201).json({ status: 'success', message: 'Room created successfully', room: roomCreated });
        }
        catch (e) {
            res.status(400).json({ status: 'error', error: e });
            console.log(e);
            return;
        }
    });
}
function getAllRooms(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            if (!userId) {
                return;
            }
            const rooms = yield relations_1.Room.findAll({
                where: {
                    id: {
                        [sequelize_1.Op.notIn]: database_1.default.literal(`(SELECT "roomId" FROM "RoomUser" WHERE "userId" = '${userId}')`)
                    }
                },
                attributes: ['id', 'roomName'],
            });
            res.status(200).json({ status: 'success', rooms });
        }
        catch (e) {
            res.status(400).json({ status: 'error', error: e });
            return;
        }
    });
}
function joinRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id_user, id_room } = req.body;
        try {
            const room = yield relations_1.Room.findByPk(id_room);
            if (!room) {
                res.status(404).json({ status: 'error', error: 'Room not found' });
                return;
            }
            yield room.addUser(id_user);
            res.status(200).json({ status: 'success', message: 'User added to room successfully' });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ status: 'error', error: e });
            return;
        }
    });
}
