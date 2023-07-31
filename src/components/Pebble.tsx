import styles from "./Pebble.module.css";
import { GameStatus, PlayerColour } from "../constants";
import { useContext, useState } from "react";
import { GameboardContext, TurnContext } from "../contexts";

export default function Pebble() {
  const { status } = useContext(GameboardContext);
  const { turn, nextTurn } = useContext(TurnContext);
  const [colourStyle, setColourStyle] = useState("");

  const getStyles = () => {
    if (!colourStyle) {
      const pebbleColour = turn!.turn === PlayerColour.BLACK ? styles.black : styles.white;
      setColourStyle([styles.pebble, pebbleColour].join(" "));
      if (status === GameStatus.NOT_OVER) nextTurn();
    }
    return colourStyle;
  }

  return (
    <div className={getStyles()} />
  )
}
