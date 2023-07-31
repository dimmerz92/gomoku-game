import styles from "./Pebble.module.css";
import { GameStatus, PlayerColour } from "../constants";
import { useContext, useEffect, useState } from "react";
import { GameboardContext, TurnContext } from "../contexts";

export default function Pebble() {
  const { turn, nextTurn } = useContext(TurnContext);
  const [colourStyle, setColourStyle] = useState("");

  useEffect(() =>{
    if (!colourStyle) {
      const pebbleColour = turn!.turn === PlayerColour.BLACK ? styles.black : styles.white;
      setColourStyle(`${styles.pebble} ${pebbleColour}`);
      nextTurn();
    }
  });

  return (
    <div className={colourStyle} />
  )
}
