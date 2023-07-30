import { GameStatus } from "../constants";
import { Gameboard } from "../types";
import { createContext } from "react";

type GameboardContextProps = {
    gameboard?: Gameboard;
    status: GameStatus;
    newBoard: () => void;
    addTurn: (id: number) => void;
    checkStatus: (id: number) => void;
}

const GameboardContext = createContext<GameboardContextProps>({} as GameboardContextProps);

export default GameboardContext;
