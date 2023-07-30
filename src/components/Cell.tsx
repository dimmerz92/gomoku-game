import styles from "./Cell.module.css";
import { useContext, useState } from "react"
import { Pebble } from ".";
import { CellStatus } from "../constants";
import { TurnContext } from "../contexts";

type CellProps = {
  cellId: number;
}

export default function Cell({ cellId }: CellProps) {
    const { turn } = useContext(TurnContext);
    const [isAvailable, setIsAvailable] = useState(CellStatus.AVAILABLE);

    const handleClick = () => {
        setIsAvailable(CellStatus.OCCUPIED);
        //report to gamearray
    }

    const getStyles = () => {
      const hover = isAvailable === CellStatus.AVAILABLE ? styles.available : null;
      return [styles.cell, hover].join(" ");
    }

  return (
    <div className={getStyles()} onClick={handleClick}>
      {isAvailable === CellStatus.OCCUPIED ? <Pebble colour={turn?.turn!} /> : null}
    </div>
  )
}
