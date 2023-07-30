import { Game } from "../types"

type GameItemProps = {
  game: Game;
}

export default function GameItem({ game }: GameItemProps) {
  return (
    <div>{`Game #${game.id} @${game.date}\tWinner ${game.outcome}`}</div>
  );
}
