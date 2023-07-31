import styles from "./Cell.module.css";
import { useContext, useState } from "react"
import { Pebble } from ".";
import { CellStatus, GameStatus } from "../constants";
import { GameboardContext, TurnContext } from "../contexts";

type CellProps = {
  cellId: number;
}

export default function Cell({ cellId }: CellProps) {
    const { addTurn, status } = useContext(GameboardContext);
    const [isAvailable, setIsAvailable] = useState(CellStatus.AVAILABLE);

    const handleClick = () => {
      if (status === GameStatus.NOT_OVER && isAvailable === CellStatus.AVAILABLE) {
        setIsAvailable(CellStatus.OCCUPIED);
        addTurn(cellId);
      }
    }

    const getStyles = () => {
      if (status === GameStatus.NOT_OVER && isAvailable === CellStatus.AVAILABLE) {
        return `${styles.cell} ${styles.available}`;
      } else {
        return `${styles.cell} ${styles.notavailable}`;
      }
    }

  return (
    <div className={getStyles()} onClick={handleClick}>
      {isAvailable === CellStatus.OCCUPIED ? <Pebble /> : null}
    </div>
  )
}
