import styles from "./Gameboard.module.css";
import { Cell, Pebble } from ".";
import { useContext } from "react";
import { SizeContext } from "../contexts";
import { Move } from "../types";

type GameboardProps = {
  log?: Move[];
}

export default function Gameboard({ log }: GameboardProps) {
  const { size } = useContext(SizeContext);

  const gameboard = () => {
    const grid = `repeat(${!log ? size!.size : log.length}, 1fr)`;
    
    return (
      <div className={styles.gameboard} style={{gridTemplateColumns: grid}}>
        {
          !log ? [...Array(size!.size**2)].map((_, i) => (
            <Cell key={i} cellId={i} />
          )) : log.map((move, i) => (
            <Cell key={i} cellId={i} move={move.id} colour={move.player}/>
          ))
        }
      </div>
    )
  }

  return (
    gameboard()
  )
}
