import styles from "./Games.module.css";
import { useContext } from "react";
import { GameboardContext } from "../contexts";
import { GameItem } from "../components";

export default function Login() {
  const { getGames } = useContext(GameboardContext);

  return (
    <div className={styles.container}>
      {getGames().map((game, i) => (
        <GameItem key={i} game={game} />
      ))}
    </div>
  )
}
