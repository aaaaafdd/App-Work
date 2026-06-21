"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = require("../controllers/contact.controller");
const router = (0, express_1.Router)();
router.post('/', contact_controller_1.createContact);
router.get('/:id_user', contact_controller_1.getAllContacts);
exports.default = router;
