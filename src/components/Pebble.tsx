import styles from "./Pebble.module.css";
import { PlayerColour } from "../constants";
import { useState } from "react";

type PebbleProps = {
  colour: PlayerColour
}

export default function Pebble({ colour }: PebbleProps) {
  const [colourStyle, setColourStyle] = useState("");

  const getStyles = () => {
    if (!colourStyle) {
      const pebbleColour = colour === PlayerColour.BLACK ? styles.black : styles.white;
      setColourStyle([styles.pebble, pebbleColour].join(" "));
    }
    return colourStyle;
  }

  return (
    <div className={getStyles()} />
  )
}
