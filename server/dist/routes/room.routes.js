"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const room_controller_1 = require("../controllers/room.controller");
const router = (0, express_1.Router)();
router.post('/create', room_controller_1.createRoom);
router.get('/all/:userId', room_controller_1.getAllRooms);
router.post('/joinRoom', room_controller_1.joinRoom);
exports.default = router;
