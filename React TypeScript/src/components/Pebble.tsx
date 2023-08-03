import styles from "./Pebble.module.css";
import { GameStatus, PlayerColour } from "../constants";
import { useContext, useEffect, useState } from "react";
import { GameboardContext, TurnContext } from "../contexts";

type PebbleProps = {
  move?: number;
  colour?: PlayerColour;
};

export default function Pebble({ move, colour }: PebbleProps) {
  const { status } = useContext(GameboardContext);
  const { turn, nextTurn } = useContext(TurnContext);
  const [colourStyle, setColourStyle] = useState("");

  // Render coloured pebble or numbered pebble depending if game or game log
  useEffect(() => {
    if (!colourStyle) {
      let style: string;
      if (!move) {
        style = turn!.turn === PlayerColour.BLACK ? styles.black : styles.white;
        if (status === GameStatus.NOT_OVER) nextTurn();
      } else {
        style = colour === PlayerColour.BLACK ? styles.black : styles.white;
      }
      setColourStyle(`${styles.pebble} ${style}`);
    }
  }, [colourStyle, move, turn, status, nextTurn, colour]);

  return <div className={colourStyle}>{move ? move : null}</div>;
}
