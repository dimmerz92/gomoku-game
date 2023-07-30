import styles from "./Game.module.css";
import { Button, Gameboard } from "../components";
import { useContext, useState } from "react";
import { GameboardContext } from "../contexts";

export default function Game() {
  const { newBoard } = useContext(GameboardContext);
  const [isReset, setIsReset] = useState(0);
  const reset = () => {
    newBoard();
    isReset ? setIsReset(0) : setIsReset(1);
  }

  return (
    <>
      <Gameboard key={isReset} />
      <div className={styles.buttons}>
        <Button onClick={() => reset()}>Reset</Button>
        <Button>Leave</Button>
      </div>
    </>
  )
}
