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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContact = createContact;
exports.getAllContacts = getAllContacts;
const relations_1 = require("../models/relations");
function createContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id_user, id_contact } = req.body;
        try {
            if (!id_user || !id_contact) {
                res.status(400).json({ status: 'error', error: 'id_user and id_contact are required' });
                return;
            }
            const contactCreated = yield relations_1.Contact.create({
                id_user: id_user,
                id_contact: id_contact
            });
            yield relations_1.Contact.create({
                id_user: id_contact,
                id_contact: id_user
            });
            res.status(201).json({ status: 'success', message: 'Contact created successfully', contact: contactCreated });
        }
        catch (e) {
            res.status(400).json({ status: 'error', error: e });
        }
    });
}
function getAllContacts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id_user } = req.params;
        try {
            const contacts = yield relations_1.Contact.findAll({
                where: {
                    id_user: id_user
                },
                include: [{
                        model: relations_1.User,
                        as: 'contactUser',
                        attributes: ['id', 'username', 'status'],
                    }]
            });
            const formattedContacts = contacts.map(contact => {
                var _a, _b;
                return ({
                    id: contact.id_contact,
                    username: (_a = contact.contactUser) === null || _a === void 0 ? void 0 : _a.username,
                    status: (_b = contact.contactUser) === null || _b === void 0 ? void 0 : _b.status
                });
            });
            res.status(200).json({ status: 'success', contacts: formattedContacts });
        }
        catch (e) {
            console.log('hubo un error', e);
            res.status(400).json({ status: 'error', error: e });
        }
    });
}
