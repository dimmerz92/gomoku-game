import styles from "./Cell.module.css";
import { useContext, useState } from "react";
import { Pebble } from ".";
import { CellStatus, GameStatus, PlayerColour } from "../constants";
import { GameboardContext } from "../contexts";

type CellProps = {
  cellId: number;
  move?: number;
  colour?: PlayerColour;
}

export default function Cell({ cellId, move, colour }: CellProps) {
  const { status, nextTurn } = useContext(GameboardContext);
  const [isAvailable, setIsAvailable] = useState(CellStatus.AVAILABLE);

  // If game is not over, handle clicks on cells
  const handleClick = () => {
    if (status === GameStatus.CONTINUE &&
        isAvailable === CellStatus.AVAILABLE) {
          setIsAvailable(CellStatus.OCCUPIED);
          nextTurn(cellId);
    }
  }

  // If game is not over, apply styling to cell
  const getStyles = () => {
    if (status === GameStatus.CONTINUE &&
        isAvailable === CellStatus.AVAILABLE) {
          return styles.available;
        } else {
          return styles.notavailable;
        }
  }

  // Apply appropriate style to cell depending on game or game log
  const style = () => {
    return `${styles.cell} ${!move ? getStyles() : styles.notavailable}`;
  }

  return (
    <div className={style()} onClick={handleClick}>
      {!move ? (isAvailable === CellStatus.OCCUPIED
        ? (<Pebble />) : null)
        : (<Pebble move={move} colour={colour} />)
      }
    </div>
  );
}
