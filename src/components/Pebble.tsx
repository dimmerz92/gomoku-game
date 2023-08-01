import styles from "./Pebble.module.css";
import { GameStatus, PlayerColour } from "../constants";
import { useContext, useEffect, useState } from "react";
import { GameboardContext, TurnContext } from "../contexts";

type PebbleProps = {
  move?: number;
  colour?: PlayerColour;
}

export default function Pebble({ move, colour }: PebbleProps) {
  const { turn, nextTurn } = useContext(TurnContext);
  const [colourStyle, setColourStyle] = useState("");

  useEffect(() =>{
    if (!colourStyle) {
      let style: string;
      if (!move) {
        style = turn!.turn === PlayerColour.BLACK ? styles.black : styles.white;
      } else {
        style = colour === PlayerColour.BLACK ? styles.black : styles.white;
      }
      setColourStyle(`${styles.pebble} ${style}`);
      nextTurn();
    }
  });

  // const pebble = () => {
  //   const style = `${styles.pebble} ${!move ? turn!.turn === PlayerColour.BLACK ?
  //                                             styles.black : styles.white
  //                                           : colour === PlayerColour.BLACK ?
  //                                             styles.black : styles.white}`
  //   if (!move) nextTurn();
  //   return (
  //     <div className={style}>
  //       {move ? move : null}
  //     </div>
  //   )
  // }

  return (
    <div className={colourStyle}>
      {move ? move : null}
    </div>
  )
}
