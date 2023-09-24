import styles from "./GameItem.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

type GameItemProps = {
  game: {
    _id: string;
    winner: string;
    createdAt: string;
  }
}

export default function GameItem({ game }: GameItemProps) {
  const navigateTo = useNavigate();

  return (
    <div className={styles.gameItem}>
      <div>{`Game #${game._id}`}<br />
           {`@${new Date(game.createdAt).toDateString()}`}</div>
      <div>{`Outcome: ${game.winner}`}</div>
      <Button onClick={() => navigateTo(`/game-log/${game._id}`)}>
        Game Log
      </Button>
    </div>
  );
}
