import { Game, GameBoard, Games } from "../types";
import { GameboardContext } from "../contexts";
import { useState } from "react";
import { GameStatus, PlayerColour } from "../constants";
import { post, put } from "../utils/http";
import { useNavigate } from "react-router-dom";

type GameboardProviderProps = {
  children: React.ReactNode;
};

function GameboardProvider ({ children }: GameboardProviderProps) {
  const [gameboard, setGameboard] = useState<GameBoard | undefined>(undefined);
  const [status, setStatus] = useState<GameStatus | undefined>(undefined);
  const [size, setSize] = useState<number | undefined>(undefined);
  const [turn, setTurn] = useState<PlayerColour | undefined>(undefined);
  const [count, setCount] = useState<number>(0);
  const navigateTo = useNavigate()

  const newBoard = async (size: number, callback: () => void) => {
    const result: GameBoard = await post("/api/game", { size: size });
    if (!result) navigateTo("/");

    setGameboard(result);
    setStatus(GameStatus.CONTINUE);
    setSize(size);
    setTurn(PlayerColour.BLACK);
    setCount(1);
    callback();
  }

  const resetGame = async () => {
    const result: GameBoard = await post(`api/game/reset/${gameboard!._id}`, {});
    if (!result) navigateTo("/");

    setGameboard(result);
    setStatus(GameStatus.CONTINUE);
    setTurn(PlayerColour.BLACK);
    setCount(1);
  }

  const nextTurn = async (index: number) => {
    const payload = {
      index: index,
      colour: turn,
      turn: count
    }
    const result: Game = await put(`/api/game/${gameboard!._id}`, payload);
    if (!result) navigateTo("/");

    setGameboard(result.state);
    setStatus(result.status);
    if (result.status == GameStatus.CONTINUE) {
      setCount(count + 1);
      setTurn(turn === PlayerColour.BLACK
        ? PlayerColour.WHITE
        : PlayerColour.BLACK);
      }
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