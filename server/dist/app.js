"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const room_routes_1 = __importDefault(require("./routes/room.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const private_chat_routes_1 = __importDefault(require("./routes/private_chat.routes"));
const room_message_routes_1 = __importDefault(require("./routes/room_message.routes"));
const socketAuth_1 = require("./sockets/socketAuth");
const socketConnect_1 = require("./sockets/socketConnect");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
});
(0, socketAuth_1.socketAuth)(io);
(0, socketConnect_1.socketConnect)(io);
app.get('/api/hello', (req, res) => {
    res.status(200).json({ message: "hello world from backend" });
});
app.use('/api/auth', auth_routes_1.default);
app.use('/api/user', user_routes_1.default);
app.use('/api/room', room_routes_1.default);
app.use('/api/contact', contact_routes_1.default);
app.use('/api/private', private_chat_routes_1.default);
app.use('/api/room_chat', room_message_routes_1.default);
exports.default = server;
