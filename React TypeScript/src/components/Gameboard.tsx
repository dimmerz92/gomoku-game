import styles from "./Gameboard.module.css";
import { Cell } from ".";
import { GameboardContext } from "../contexts";
import { useContext } from "react";
import { GameBoard } from "../types";
import { PlayerColour } from "../constants";

type GameboardProps = {
  log?: GameBoard;
}

export default function Gameboard({ log }: GameboardProps) {
  const { size } = useContext(GameboardContext);

  // Determine grid size depending if game or game log
  const grid = () => `repeat(${size}, 1fr)`;

  return (
    <div className={styles.gameboard} style={{ gridTemplateColumns: grid()}}>
      {
        !log
          ? [...Array(size! ** 2)].map((_, i) => <Cell key={i} cellId={i} />)
          : log.gameboard.map((move, i) => <Cell key={i} cellId={i}
              move={move ? move.turn : undefined}
              colour={move ? move.colour as PlayerColour : undefined} />)
      }
    </div>
  );
}