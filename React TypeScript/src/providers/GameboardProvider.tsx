import { Game, GameBoard, GameBoards } from "../types";
import { GameboardContext } from "../contexts";
import { useState } from "react";
import { GameStatus, PlayerColour } from "../constants";
import { get, post, put, del } from "../utils/http";
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
    const result: GameBoard = await post
      (`/api/game/reset/${gameboard!._id}`, {});
    if (!result) navigateTo("/");

    setGameboard(result);
    setStatus(GameStatus.CONTINUE);
    setTurn(PlayerColour.BLACK);
    setCount(1);
  }

  const leaveGame = async (callback: () => void) => {
    if (status === GameStatus.CONTINUE){
      await del(`/api/game/delete/${gameboard!._id}`);
    }
    setGameboard(undefined);
    setStatus(undefined);
    setSize(undefined);
    setTurn(undefined);
    setCount(0);
    callback();
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
    if (result.status === GameStatus.CONTINUE) {
      setCount(count + 1);
      setTurn(turn === PlayerColour.BLACK
        ? PlayerColour.WHITE
        : PlayerColour.BLACK);
      }
  }

  const getGame = async (game_id: string) => {
    const result = await get<GameBoard>(`/api/game/one/${game_id}`);
    if (!result) navigateTo("/");
    return result;
  }

  const getGames = async () => {
    const result = await get<GameBoards>("/api/game/all");
    if (!result) navigateTo("/");
    return result;
  }

  const setGameLog = async (game: GameBoard) => {
    setGameboard(game);
    setSize(game.size);
    setTurn(game.winner as PlayerColour);
  }

  return (
    <GameboardContext.Provider
      value={{ gameboard, status, turn, size,
        newBoard, resetGame, leaveGame, nextTurn,
        getGames, getGame, setGameLog }}>
          {children}
    </GameboardContext.Provider>
  );
}

export default GameboardProvider;