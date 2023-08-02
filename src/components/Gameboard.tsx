import styles from "./Gameboard.module.css";
import { Cell } from ".";
import { useContext } from "react";
import { SizeContext } from "../contexts";
import { Move } from "../types";

type GameboardProps = {
  log?: Move[];
};

export default function Gameboard({ log }: GameboardProps) {
  const { size } = useContext(SizeContext);

  const gameboard = () => {
    const grid = `repeat(${!log ? size!.size : Math.sqrt(log.length)}, 1fr)`;

    console.log(grid);

    return (
      <div className={styles.gameboard} style={{ gridTemplateColumns: grid }}>
        {!log
          ? [...Array(size!.size ** 2)].map((_, i) => (
              <Cell key={i} cellId={i} />
            ))
          : log.map((move, i) => (
              <Cell
                key={i}
                cellId={i}
                move={move ? move.id : undefined}
                colour={move ? move.player : undefined}
              />
            ))}
      </div>
    );
  };

  return gameboard();
}
