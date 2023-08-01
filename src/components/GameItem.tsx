import styles from "./GameItem.module.css";
import { Game } from "../types"
import Button from "./Button";

type GameItemProps = {
  game: Game;
}

const handleClick = () => {
  // use game id to open game log
}

export default function GameItem({ game }: GameItemProps) {
  return (
    <div className={styles.gameItem}>
      <div>{`Game #${game.id} @${game.date}`}</div>
      <div>{`Outcome: ${game.outcome}`}</div>
      <Button>Game Log</Button>
    </div>
  );
}
