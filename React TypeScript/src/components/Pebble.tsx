import styles from "./Pebble.module.css";
import { GameStatus, PlayerColour } from "../constants";
import { useContext, useEffect, useState } from "react";
import { GameboardContext } from "../contexts";

type PebbleProps = {
  move?: number;
  colour?: PlayerColour;
}

export default function Pebble({ move, colour }: PebbleProps) {
  const { status, turn, nextTurn } = useContext(GameboardContext);
  const [colourStyle, setColourStyle] = useState("");

  // Render coloured pebble or numbered pebble depending if game or game log
  useEffect(() => {
    if (!colourStyle) {
      let style: string;
      if (!move && status === GameStatus.CONTINUE) {
        style = turn === PlayerColour.BLACK ? styles.black : styles.white;
      } else {
        style = colour === PlayerColour.BLACK ? styles.black : styles.white;
      }
      setColourStyle(`${styles.pebble} ${style}`);
    }
  }, [colourStyle, move, turn, status, nextTurn, colour]);

  return <div className={colourStyle}>{move ? move : null}</div>;
}