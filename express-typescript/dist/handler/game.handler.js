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
const express_1 = __importDefault(require("express"));
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const game_schema_1 = require("../schema/game.schema");
const game_service_1 = require("../service/game.service");
const deserialiseUser_1 = require("../middleware/deserialiseUser");
const gameHandler = express_1.default.Router();
gameHandler.use(deserialiseUser_1.deserialiseUser);
// Returns a game
gameHandler.get("/one/:game_id", (0, validateSchema_1.default)(game_schema_1.getGameSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user_id;
    const game_id = req.params.game_id;
    const game = yield (0, game_service_1.getGameById)(user_id, game_id);
    if (!game) {
        return res.status(400).send("Bad Request");
    }
    return res.status(200).json(game);
}));
// Returns all games info for a user
gameHandler.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user_id;
    const games = yield (0, game_service_1.getGamesById)(user_id);
    if (!games) {
        return res.status(400).send("Bad Request");
    }
    return res.status(200).json(games);
}));
// Creates a new game
gameHandler.post("/", (0, validateSchema_1.default)(game_schema_1.createGameSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user_id;
    const size = req.body.size;
    const new_game = yield (0, game_service_1.createGame)(user_id, size);
    if (!new_game) {
        return res.status(401).send("Unauthorised");
    }
    return res.status(201).json(new_game);
}));
// Resets a game
gameHandler.post("/reset/:game_id", (0, validateSchema_1.default)(game_schema_1.resetGameSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user_id;
    const game_id = req.params.game_id;
    const game_state = yield (0, game_service_1.resetGameState)(user_id, game_id);
    if (!game_state) {
        return res.status(400).send("Bad Request");
    }
    return res.status(201).json(game_state);
}));
// Updates the game state and returns the new game state
gameHandler.put("/:game_id", (0, validateSchema_1.default)(game_schema_1.updateGameSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user_id;
    const game_id = req.params.game_id;
    const index = req.body.index;
    const colour = req.body.colour;
    const turn = req.body.turn;
    const game_state = yield (0, game_service_1.updateGameState)(user_id, game_id, index, colour, turn);
    if (!game_state) {
        return res.status(400).send("Bad Request");
    }
    return res.status(200).send(game_state);
}));
// Deletes a game
gameHandler.delete("/delete/:game_id", (0, validateSchema_1.default)(game_schema_1.deleteGameSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user_id;
    const game_id = req.params.game_id;
    const result = yield (0, game_service_1.deleteGame)(user_id, game_id);
    if (!result) {
        return res.status(400).send("Bad Request");
    }
    return res.sendStatus(204);
}));
exports.default = gameHandler;
