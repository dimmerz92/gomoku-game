import styles from "./Games.module.css";
import { useContext, useEffect, useMemo, useState } from "react";
import { GameboardContext } from "../contexts";
import { GameItem } from "../components";
import { GameBoards } from "../types";

export default function Games() {
  const { getGames } = useContext(GameboardContext);
  const [games, setGames] = useState<GameBoards | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    getGames().then(fetchedGames => {
      setGames(fetchedGames as GameBoards);
      setLoading(false);
    });
  }, [getGames, setGames, setLoading]);

  if (loading) return null;

  return (
    <div className={styles.container}>
      {games!.map((game, i) => <GameItem key={i} game={game} />)}
    </div>
  );
}
