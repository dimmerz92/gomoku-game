import { GameDocument, GameCell } from "../model/game.model";
import { GameStatus } from "../enum/game.enum";

// Recursively checks gameboard diagonals for 5 in a row
const diagCheck = (
    gameboard: (GameCell | undefined)[], size: number, index: number,
    direction: number, colour: string): number => {
        if (!gameboard[index]) return 0;
        if (index < 0 || index > size ** 2) return 0;
        if (gameboard[index]!.colour !== colour) return 0;
        if (Math.floor(index / size) ===
            Math.floor((index + direction) / size)) return 0;
        return 1 +
            diagCheck(gameboard, size, index + direction, direction, colour);
}

// Checks the gameboard for vertical or horizontal 5 in a row
const linearCheck =
    (gameboard: (GameCell | undefined)[], size:number, index: number,
     colour: string, row: boolean = false): boolean => {
        let arr = new Array<string | undefined>(5).fill(undefined);
        // If row, get row, otherwise, get column
        if (row) {
            arr = gameboard.slice(index, index + size).map(i => i?.colour);
        } else {
            let count = 0;
            for (let i = index; i < gameboard.length; i += size) {
                arr[count] = gameboard[i]?.colour;
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
}

// Checks the game status and updates the state
export const isTerminal =
    (game: GameDocument, index: number, colour: string): GameStatus => {
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
                return GameStatus.WIN;
        } else if (draw) {
            return GameStatus.DRAW;
        }
        return GameStatus.CONTINUE;
}