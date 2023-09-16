import { GameStatus, PlayerColour } from "../constants";
import { GameBoard, GameBoards } from "../types";
import { createContext } from "react";

type GameboardContextProps = {
  gameboard: GameBoard | undefined;
  status: GameStatus | undefined;
  turn: PlayerColour | undefined;
  size: number | undefined;
  newBoard: (size: number, callback: () => void) => void;
  resetGame: () => void;
  leaveGame: (callback: () => void) => void;
  nextTurn: (index: number) => void;
  getGame: (game_id: string) => Promise<GameBoard>;
  getGames: () => Promise<GameBoards>;
}

const GameboardContext = createContext<GameboardContextProps>
  ({} as GameboardContextProps);

export default GameboardContext;
