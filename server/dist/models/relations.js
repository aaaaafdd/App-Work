"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomMessage = exports.PrivateMessage = exports.Contact = exports.User = exports.Room = void 0;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Room_1 = __importDefault(require("./Room"));
exports.Room = Room_1.default;
const Contact_1 = __importDefault(require("./Contact"));
exports.Contact = Contact_1.default;
const PrivateMessage_1 = __importDefault(require("./PrivateMessage"));
exports.PrivateMessage = PrivateMessage_1.default;
const RoomMessage_1 = __importDefault(require("./RoomMessage"));
exports.RoomMessage = RoomMessage_1.default;
Room_1.default.belongsToMany(User_1.default, {
    through: 'RoomUser',
    uniqueKey: 'room_user_unique'
});
User_1.default.belongsToMany(Room_1.default, {
    through: 'RoomUser',
    uniqueKey: 'room_user_unique'
});
User_1.default.hasMany(Contact_1.default, {
    foreignKey: 'id_user',
    as: 'ownedContacts'
});
User_1.default.hasMany(Contact_1.default, {
    foreignKey: 'id_contact',
    as: 'contactInLists'
});
Contact_1.default.belongsTo(User_1.default, {
    foreignKey: 'id_user',
    as: 'ownerUser'
});
Contact_1.default.belongsTo(User_1.default, {
    foreignKey: 'id_contact',
    as: 'contactUser'
});
User_1.default.hasMany(PrivateMessage_1.default, { foreignKey: 'senderId', as: 'sentMessages' });
User_1.default.hasMany(PrivateMessage_1.default, { foreignKey: 'receiverId', as: 'receivedMessages' });
PrivateMessage_1.default.belongsTo(User_1.default, { foreignKey: 'senderId', as: 'sentUser' });
PrivateMessage_1.default.belongsTo(User_1.default, { foreignKey: 'receiverId', as: 'receivedUser' });
User_1.default.hasMany(RoomMessage_1.default, { foreignKey: 'senderId', as: 'sentRoomMessages' });
Room_1.default.hasMany(RoomMessage_1.default, { foreignKey: 'roomId', as: 'sentRoomMessages' });
RoomMessage_1.default.belongsTo(User_1.default, { foreignKey: 'senderId', as: 'receivedUserRoom' });
RoomMessage_1.default.belongsTo(Room_1.default, { foreignKey: 'roomId', as: 'receivedRoom' });
