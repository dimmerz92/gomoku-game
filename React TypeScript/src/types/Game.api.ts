import { GameStatus } from "../constants";

export type GameCell = {
    user_id: string;
    colour: string;
    turn: number;
}

export type GameBoard = {
    _id: string;
    user_id: string;
    size: number;
    gameboard: Array<undefined | GameCell>;
    colour?: string;
    winner?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Game = {
    status: GameStatus;
    state: GameBoard;
}

export type Games = {
    games: GameBoard[]
}