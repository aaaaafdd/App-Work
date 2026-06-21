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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const saltRounds = 10;
const jwtSecret = process.env.SECRET_KEY || 'default';
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.hash(password, saltRounds);
    });
}
function comparePassword(password, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.compare(password, hash);
    });
}
function generateToken(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return jsonwebtoken_1.default.sign(payload, jwtSecret);
    });
}
function verifyToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return jsonwebtoken_1.default.verify(token, jwtSecret);
    });
}
