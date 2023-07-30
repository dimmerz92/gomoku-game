import styles from "./Pebble.module.css";
import { PlayerColour } from "../constants";

type PebbleProps = {
  colour: PlayerColour
}

export default function Pebble({ colour }: PebbleProps) {

  const getStyles = () => {
    const pebbleColour = colour === PlayerColour.BLACK ? styles.black : styles.white;
    return [styles.pebble, pebbleColour].join(" ");
  }

  return (
    <div className={getStyles()} />
  )
}
