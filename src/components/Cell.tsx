import styles from "./Cell.module.css";
import { useContext, useState } from "react"
import { Pebble } from ".";
import { CellStatus, GameStatus, PlayerColour } from "../constants";
import { GameboardContext, TurnContext } from "../contexts";

type CellProps = {
  cellId: number;
  move?: number;
  colour?: PlayerColour;
}

export default function Cell({ cellId, move, colour }: CellProps) {
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
        return styles.available;
      } else {
        return styles.notavailable;
      }
    }

    const cell = () => {
      const style = `${styles.cell} ${!move ? getStyles() : styles.notavailable}`;

      return (
        <div className={style} onClick={handleClick}>
          {
            !move ? isAvailable === CellStatus.OCCUPIED ? <Pebble /> : null
                  : <Pebble move={move} colour={colour} />
          }
        </div>
      )
    }

  return (
    cell()
  )
}
