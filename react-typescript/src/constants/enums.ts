export enum CellStatus {
  OCCUPIED = "OCCUPIED",
  AVAILABLE = "AVAILABLE",
}

export enum PlayerColour {
  BLACK = "BLACK",
  WHITE = "WHITE",
}

export enum GameStatus {
  WIN = "WIN",
  LOSE = "LOSE",
  DRAW = "DRAW",
  CONTINUE = "CONTINUE"
}

export const API_HOST = process.env.REACT_APP_API_HOST || ""; 