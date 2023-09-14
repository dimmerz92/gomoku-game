import { GameBoard, Games } from "../types";
import { GameboardContext } from "../contexts";
import { useState } from "react";
import { GameStatus, PlayerColour } from "../constants";
import { post } from "../utils/http";
import { useNavigate } from "react-router-dom";

type GameboardProviderProps = {
  children: React.ReactNode;
};

function GameboardProvider ({ children }: GameboardProviderProps) {
  const [gameboard, setGameboard] = useState<GameBoard | undefined>(undefined);
  const [status, setStatus] = useState<GameStatus | undefined>(undefined);
  const [size, setSize] = useState<number | undefined>(undefined);
  const [turn, setTurn] = useState<PlayerColour | undefined>(undefined);
  const [count, setCount] = useState<number | undefined>(undefined);
  const navigateTo = useNavigate()

  const newBoard = async (size: number) => {
    const result: GameBoard = await post("/game", { size: size });
    if (!result) navigateTo("/");

    setGameboard(result);
    setStatus(GameStatus.CONTINUE);
    setSize(size);
    setTurn(PlayerColour.BLACK);
    setCount(1);
  }

  const resetGame = () => {
    //
  }

  const nextTurn = (index: number) => {
    //
  }

  const getGames = () => {
    return {} as Games
  }

  return (
    <GameboardContext.Provider
      value={{ gameboard, status, turn, size, newBoard, resetGame, nextTurn, getGames }}>
        {children}
    </GameboardContext.Provider>
  );
}

export default GameboardProvider;