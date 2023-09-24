import styles from "./Game.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Gameboard } from "../components";
import { useContext, useEffect, useState } from "react";
import { GameboardContext } from "../contexts";
import { GameBoard } from "../types";

export default function GameLog() {
  const { getGame, setGameLog } = useContext(GameboardContext);
  const { game_id } = useParams();
  const [log, setLog] = useState<GameBoard | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (game_id && loading) {
      getGame(game_id!).then(fetchedGames => {
        setLog(fetchedGames as GameBoard);
        setGameLog(fetchedGames as GameBoard);
        setLoading(false);
      });
    }
  }, [game_id, getGame, setLog, setLoading]);

  if (loading) return null;

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
