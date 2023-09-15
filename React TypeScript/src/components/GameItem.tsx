import styles from "./GameItem.module.css";
import { GameBoard } from "../types";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

type GameItemProps = {
  game: GameBoard;
}

export default function GameItem({ game }: GameItemProps) {
  const navigateTo = useNavigate();

  return (
    <div className={styles.gameItem}>
      <div>{`Game #${game._id} @${game.updatedAt}`}</div>
      <div>{`Outcome: ${game.winner}`}</div>
      <Button onClick={() => navigateTo(`/game-log/${game._id}`)}>
        Game Log
      </Button>
    </div>
  );
}
