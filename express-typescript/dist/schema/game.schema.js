"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGameSchema = exports.resetGameSchema = exports.updateGameSchema = exports.createGameSchema = exports.getGameSchema = void 0;
const zod_1 = require("zod");
const postPayload = {
    body: (0, zod_1.object)({
        size: (0, zod_1.number)({
            required_error: "Size is required"
        }).nonnegative()
    })
};
const putPayload = {
    body: (0, zod_1.object)({
        index: (0, zod_1.number)({
            required_error: "Cell index is required"
        }).nonnegative(),
        colour: (0, zod_1.string)({
            required_error: "Stone colour is required"
        })
    })
};
const getParams = {
    params: (0, zod_1.object)({
        game_id: (0, zod_1.string)({
            required_error: "Game ID is required"
        })
    })
};
const postParams = {
    params: (0, zod_1.object)({
        game_id: (0, zod_1.string)({
            required_error: "Game ID is required"
        })
    })
};
const putParams = {
    params: (0, zod_1.object)({
        game_id: (0, zod_1.string)({
            required_error: "Game ID is required"
        })
    })
};
const deleteParams = {
    params: (0, zod_1.object)({
        game_id: (0, zod_1.string)({
            required_error: "Game ID is required"
        })
    })
};
exports.getGameSchema = (0, zod_1.object)(Object.assign({}, getParams));
exports.createGameSchema = (0, zod_1.object)(Object.assign({}, postPayload));
exports.updateGameSchema = (0, zod_1.object)(Object.assign(Object.assign({}, putPayload), putParams));
exports.resetGameSchema = (0, zod_1.object)(Object.assign({}, postParams));
exports.deleteGameSchema = (0, zod_1.object)(Object.assign({}, deleteParams));
