"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const private_message_controller_1 = require("../controllers/private_message.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/:userId1/:userId2', private_message_controller_1.getPrivateChat);
router.post('/', private_message_controller_1.sendPrivateMessage);
exports.default = router;
