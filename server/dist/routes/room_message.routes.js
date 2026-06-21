"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const room_message_controller_1 = require("../controllers/room_message.controller");
const router = (0, express_1.Router)();
router.get('/:roomId', room_message_controller_1.getChatMessages);
exports.default = router;
