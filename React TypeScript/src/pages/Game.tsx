import styles from "./Game.module.css";
import { Button, Gameboard } from "../components";
import { useContext, useState } from "react";
import { GameboardContext } from "../contexts";
import { GameStatus } from "../constants";
import { useNavigate } from "react-router-dom";

export default function Game() {
  const { status, turn, resetGame, leaveGame } = useContext(GameboardContext);
  const [isReset, setIsReset] = useState(0);
  const navigateTo = useNavigate();

  // Handle reset button click
  const reset = () => {
    resetGame();
    isReset ? setIsReset(0) : setIsReset(1);
  }

  // Handle leave button click
  const leave = () => {
    leaveGame(() => {
      navigateTo("/");
    });
  }

  // Display metadata about the game progress
  const infoPanel = () => {
    if (status === GameStatus.CONTINUE) {
      return `${turn}'S TURN`;
    } else if (status === GameStatus.DRAW) {
      return "THE GAME ENDED IN A DRAW";
    } else {
      return `${turn} WON`;
    }
  }

  return (
    <>
      <span className={styles.info}>{infoPanel()}</span>
      <Gameboard key={isReset} />
      <div className={styles.buttons}>
        <Button onClick={() => reset()}>Reset</Button>
        <Button onClick={() => leave()}>Leave</Button>
      </div>
    </>
  );
}
