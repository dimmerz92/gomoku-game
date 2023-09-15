import { GameStatus, PlayerColour } from "../constants";
import { GameBoard, Games } from "../types";
import { createContext } from "react";

type GameboardContextProps = {
  gameboard: GameBoard | undefined;
  status: GameStatus | undefined;
  turn: PlayerColour | undefined;
  size: number | undefined;
  newBoard: (size: number, callback: () => void) => void;
  resetGame: () => void;
  nextTurn: (index: number) => void;
  getGames: () => Games;
}

const GameboardContext = createContext<GameboardContextProps>
  ({} as GameboardContextProps);

export default GameboardContext;
