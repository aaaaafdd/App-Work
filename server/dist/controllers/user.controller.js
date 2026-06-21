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
exports.getUser = getUser;
exports.getUserRooms = getUserRooms;
exports.getAllUsers = getAllUsers;
const sequelize_1 = require("sequelize");
const relations_1 = require("../models/relations");
const database_1 = __importDefault(require("../database/database"));
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const user = yield relations_1.User.findByPk(userId);
            if (!user) {
                res.status(404).json({ status: "error", error: "User not found" });
                return;
            }
            res.status(200).json({ status: "success", user });
        }
        catch (e) {
            res.status(400).json({ status: "error", error: e });
        }
    });
}
function getUserRooms(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const user = yield relations_1.User.findByPk(userId);
            if (!user) {
                res.status(404).json({ status: "error", error: "User not found" });
                return;
            }
            const rooms = yield user.getRooms();
            res.status(200).json({ status: "success", rooms });
        }
        catch (e) {
            res.status(400).json({ status: "error", error: e });
        }
    });
}
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const users = yield relations_1.User.findAll({
                where: {
                    id: {
                        [sequelize_1.Op.ne]: userId,
                        [sequelize_1.Op.notIn]: database_1.default.literal(`(SELECT id_contact FROM contacts WHERE id_user = '${userId}')`),
                    }
                },
                attributes: ['id', 'username', 'status']
            });
            res.status(200).json({ status: "success", users });
        }
        catch (e) {
            res.status(400).json({ status: "error", error: e });
        }
    });
}
