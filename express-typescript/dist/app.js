"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB_1 = __importDefault(require("./util/connectDB"));
const game_handler_1 = __importDefault(require("./handler/game.handler"));
const auth_handler_1 = __importDefault(require("./handler/auth.handler"));
dotenv_1.default.config();
(0, connectDB_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use("/api/game", game_handler_1.default);
app.use("/api/auth", auth_handler_1.default);
mongoose_1.default.connection.once("connected", () => {
    console.log("[server]: Conntected to MongoDB");
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
});
