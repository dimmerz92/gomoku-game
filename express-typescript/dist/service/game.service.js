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
exports.deleteGame = exports.resetGameState = exports.updateGameState = exports.createGame = exports.getGameById = exports.getGamesById = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../model/user.model"));
const game_model_1 = __importDefault(require("../model/game.model"));
const win_status_1 = require("../game_logic/win_status");
const game_enum_1 = require("../enum/game.enum");
// Retrieves a list of games belonging to a user
function getGamesById(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return game_model_1.default.find({
            user_id: new mongoose_1.default.Types.ObjectId(user_id)
        }, "_id winner createdAt").sort({ createdAt: "desc" });
    });
}
exports.getGamesById = getGamesById;
// Retrieves a game by it's ID, ensuring it belongs to the requesting user
function getGameById(user_id, game_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return game_model_1.default.findOne({
            _id: new mongoose_1.default.Types.ObjectId(game_id),
            user_id: new mongoose_1.default.Types.ObjectId(user_id)
        }).lean();
    });
}
exports.getGameById = getGameById;
// Creates a new game and assigns it to the user ID
function createGame(user_id, size) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_exists = yield user_model_1.default.exists({ _id: user_id });
        if (!user_exists)
            return null;
        const game = {
            user_id: new mongoose_1.default.Types.ObjectId(user_id),
            size: size,
            gameboard: new Array(size ** 2).fill(undefined)
        };
        return game_model_1.default.create(game);
    });
}
exports.createGame = createGame;
// Updates the game state for a game ID and its user
function updateGameState(user_id, game_id, index, colour, turn) {
    return __awaiter(this, void 0, void 0, function* () {
        const game_state = yield getGameById(user_id, game_id);
        if (!game_state)
            return null;
        const move = {
            user_id: new mongoose_1.default.Types.ObjectId(user_id),
            colour: colour,
            turn: turn
        };
        game_state.gameboard[index] = move;
        const status = (0, win_status_1.isTerminal)(game_state, index, colour);
        let winner;
        if (status !== game_enum_1.GameStatus.CONTINUE) {
            winner = status === game_enum_1.GameStatus.DRAW
                ? status
                : move.colour;
        }
        const return_state = yield game_model_1.default.findOneAndUpdate({
            _id: new mongoose_1.default.Types.ObjectId(game_id),
            user_id: new mongoose_1.default.Types.ObjectId(user_id)
        }, { gameboard: game_state.gameboard, winner: winner }, { new: true }).lean();
        return {
            status: status,
            state: return_state
        };
    });
}
exports.updateGameState = updateGameState;
// Resets a game state for a game ID and its user
function resetGameState(user_id, game_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const game_state = yield getGameById(user_id, game_id);
        if (!game_state)
            return null;
        return game_model_1.default.findOneAndUpdate({
            _id: new mongoose_1.default.Types.ObjectId(game_id),
            user_id: new mongoose_1.default.Types.ObjectId(user_id)
        }, { gameboard: game_state.gameboard.fill(undefined), $unset: { winner: 1 } }, { new: true }).lean();
    });
}
exports.resetGameState = resetGameState;
// Deletes a game based on game ID and its user
function deleteGame(user_id, game_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield game_model_1.default.deleteOne({
            _id: new mongoose_1.default.Types.ObjectId(game_id),
            user_id: new mongoose_1.default.Types.ObjectId(user_id)
        });
        if (result.deletedCount !== 1)
            return false;
        return true;
    });
}
exports.deleteGame = deleteGame;
