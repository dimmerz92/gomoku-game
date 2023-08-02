import styles from "./Game.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Gameboard } from "../components";
import { useContext } from "react";
import { GameboardContext } from "../contexts";

export default function GameLog() {
  const { getGames } = useContext(GameboardContext);
  const { gameid } = useParams();
  const navigateTo = useNavigate();

  if (!gameid) return null;
  const games = getGames();
  if (!games) return null;
  const log = games.find((l) => l.id === parseInt(gameid!))?.log;
  console.log(log);

  return (
    <>
      <div style={{ marginTop: "2rem" }} />
      <Gameboard log={log} />
      <div className={styles.buttons}>
        <Button onClick={() => navigateTo("/games")}>Back</Button>
      </div>
    </>
  );
}
