"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTerminal = void 0;
const game_enum_1 = require("../enum/game.enum");
// Recursively checks gameboard diagonals for 5 in a row
const diagCheck = (gameboard, size, index, direction, colour) => {
    if (!gameboard[index])
        return 0;
    if (index < 0 || index > size ** 2)
        return 0;
    if (gameboard[index].colour !== colour)
        return 0;
    if (Math.floor(index / size) ===
        Math.floor((index + direction) / size))
        return 0;
    return 1 +
        diagCheck(gameboard, size, index + direction, direction, colour);
};
// Checks the gameboard for vertical or horizontal 5 in a row
const linearCheck = (gameboard, size, index, colour, row = false) => {
    var _a;
    let arr = new Array(5).fill(undefined);
    // If row, get row, otherwise, get column
    if (row) {
        arr = gameboard.slice(index, index + size).map(i => i === null || i === void 0 ? void 0 : i.colour);
    }
    else {
        let count = 0;
        for (let i = index; i < gameboard.length; i += size) {
            arr[count] = (_a = gameboard[i]) === null || _a === void 0 ? void 0 : _a.colour;
            count++;
        }
    }
    // If 5 in a row, return true, else, false
    if (size === 5) {
        return arr.every(i => i === colour);
    }
    for (let i = 0; i < size - 5; i++) {
        if (arr.slice(i, i + 5).every(j => j === colour)) {
            return true;
        }
    }
    return false;
};
// Checks the game status and updates the state
const isTerminal = (game, index, colour) => {
    const gameboard = game.gameboard;
    const size = game.size;
    const row = Math.floor(index / size) * size;
    const col = index % size;
    const l_diag = (diagCheck(gameboard, size, index, size + 1, colour) +
        diagCheck(gameboard, size, index, -(size + 1), colour) - 1) === 5;
    const r_diag = (diagCheck(gameboard, size, index, size - 1, colour) +
        diagCheck(gameboard, size, index, -(size - 1), colour) - 1) === 5;
    const vertical = linearCheck(gameboard, size, col, colour);
    const horizontal = linearCheck(gameboard, size, row, colour, true);
    const draw = gameboard.every(i => i !== null);
    if (r_diag || l_diag ||
        vertical || horizontal) {
        return game_enum_1.GameStatus.WIN;
    }
    else if (draw) {
        return game_enum_1.GameStatus.DRAW;
    }
    return game_enum_1.GameStatus.CONTINUE;
};
exports.isTerminal = isTerminal;
