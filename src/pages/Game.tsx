import styles from "./Game.module.css";
import { Button, Gameboard } from "../components";
import { useContext, useState } from "react";
import { GameboardContext, TurnContext } from "../contexts";
import { GameStatus } from "../constants";
import { useNavigate } from "react-router-dom";

export default function Game() {
  const { status, newBoard } = useContext(GameboardContext);
  const { turn } = useContext(TurnContext);
  const [isReset, setIsReset] = useState(0);
  const navigateTo = useNavigate();

  const reset = () => {
    newBoard();
    isReset ? setIsReset(0) : setIsReset(1);
  };

  const leave = () => {
    navigateTo(status === GameStatus.NOT_OVER ? "/home" : "/games");
  };

  const infoPanel = () => {
    if (status === GameStatus.NOT_OVER) {
      return `${turn!.turn}'S TURN`;
    } else if (status === GameStatus.DRAW) {
      return "THE GAME ENDED IN A DRAW";
    } else {
      return `${turn!.turn} WON`;
    }
  };

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
