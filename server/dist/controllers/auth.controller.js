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
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const relations_1 = require("../models/relations");
const authFunctions_1 = require("../utils/authFunctions");
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        const hashedPassword = yield (0, authFunctions_1.hashPassword)(password);
        try {
            const userCreated = yield relations_1.User.create({
                username,
                email,
                password: hashedPassword
            });
            res.status(201).json({ status: 'success', message: "User created succesfullly" });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ status: 'error', error: e });
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield relations_1.User.findOne({ where: { email } });
            if (!user) {
                res.status(404).json({ status: 'error', error: "User not found" });
                return;
            }
            const isPasswordValid = yield (0, authFunctions_1.comparePassword)(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ status: 'error', error: "Invalid password" });
                return;
            }
            const token = yield (0, authFunctions_1.generateToken)({ id: user.id, email: user.email });
            res.status(200).json({ status: 'success', message: "Login successful", token, user: { id: user.id, username: user.username } });
        }
        catch (e) {
            res.status(400).json({ status: 'error', error: e });
        }
    });
}
