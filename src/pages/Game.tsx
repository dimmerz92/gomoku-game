import styles from "./Game.module.css";
import { Button, Gameboard } from "../components";
import { useContext, useState } from "react";
import { GameboardContext } from "../contexts";
import { GameStatus } from "../constants";
import { useNavigate } from "react-router-dom";

export default function Game() {
  const { status, newBoard } = useContext(GameboardContext);
  const [isReset, setIsReset] = useState(0);
  const navigateTo = useNavigate();
  
  const reset = () => {
    newBoard();
    isReset ? setIsReset(0) : setIsReset(1);
  }

  const leave = () => {
    navigateTo(status === GameStatus.NOT_OVER ? "/home" : "/games")
  }

  return (
    <>
      <Gameboard key={isReset} />
      <div className={styles.buttons}>
        <Button onClick={() => reset()}>Reset</Button>
        <Button onClick={() => leave()}>Leave</Button>
      </div>
    </>
  )
}
