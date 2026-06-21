"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.get('/:userId', user_controller_1.getAllUsers);
router.get('/me/:userId', user_controller_1.getUser);
router.get('/userRooms/:userId', user_controller_1.getUserRooms);
exports.default = router;
