import styles from "./Pebble.module.css";
import { PlayerColour } from "../constants";
import { useContext, useState } from "react";
import { TurnContext } from "../contexts";

export default function Pebble() {
  const { turn, nextTurn } = useContext(TurnContext);
  const [colourStyle, setColourStyle] = useState("");

  const getStyles = () => {
    if (!colourStyle) {
      const pebbleColour = turn!.turn === PlayerColour.BLACK ? styles.black : styles.white;
      setColourStyle([styles.pebble, pebbleColour].join(" "));
      nextTurn()
    }
    return colourStyle;
  }

  return (
    <div className={getStyles()} />
  )
}
