"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
class PrivateMessage extends sequelize_1.Model {
}
PrivateMessage.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    senderId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    receiverId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    timestamps: true,
    modelName: 'private_messages'
});
exports.default = PrivateMessage;
