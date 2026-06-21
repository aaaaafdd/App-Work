"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dbAuth_1 = require("./utils/dbAuth");
const PORT = process.env.PORT || 3030;
app_1.default.listen(PORT, () => {
    (0, dbAuth_1.connectToDatabase)();
    console.log(`Server active on port ${PORT}`);
});
