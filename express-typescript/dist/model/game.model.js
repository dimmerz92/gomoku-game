"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cellSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    colour: {
        type: String,
        required: true
    },
    turn: {
        type: Number,
        required: true
    }
});
const gameSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    gameboard: {
        type: [cellSchema],
        required: true
    },
    winner: {
        type: String,
        required: false
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Game", gameSchema);
