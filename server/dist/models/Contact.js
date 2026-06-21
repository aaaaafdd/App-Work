"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
class Contact extends sequelize_1.Model {
}
Contact.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    id_user: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    id_contact: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    }
}, {
    sequelize: database_1.default,
    modelName: 'contact',
    timestamps: true,
});
exports.default = Contact;
