import styles from "./Gameboard.module.css";
import { Cell } from ".";
import { useContext } from "react";
import { SizeContext } from "../contexts";

export default function Gameboard() {
  const { size } = useContext(SizeContext);

  return (
    <div className={styles.gameboard} style={{gridTemplateColumns: `repeat(${size!.size}, 1fr)`}}>
      {[...Array(size!.size**2)].map((_, i) => (
        <Cell key={i} cellId={i}/>
      ))}
    </div>
  )
}
