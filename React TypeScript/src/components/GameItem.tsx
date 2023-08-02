import styles from "./GameItem.module.css";
import { Game } from "../types";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

type GameItemProps = {
  game: Game;
};

export default function GameItem({ game }: GameItemProps) {
  const navigateTo = useNavigate();

  return (
    <div className={styles.gameItem}>
      <div>{`Game #${game.id} @${game.date}`}</div>
      <div>{`Outcome: ${game.outcome}`}</div>
      <Button onClick={() => navigateTo(`/game-log/${game.id}`)}>
        Game Log
      </Button>
    </div>
  );
}
