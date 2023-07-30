import styles from "./BoardSize.module.css";
import { useContext, useState } from "react";
import { GameboardContext, SizeContext, TurnContext, UserContext } from "../contexts";
import { Button, SizeButton } from ".";
import { useNavigate } from "react-router-dom";

const TILES = [5, 7, 9, 11];

export default function BoardSize() {
  const { size, newSize } = useContext(SizeContext);
  const { initTurn } = useContext(TurnContext);
  const { newBoard } = useContext(GameboardContext);
  const { user } = useContext(UserContext);
  const [unselected, setUnselected] = useState(false);

  const navigateTo = useNavigate();
  const handleSizeClick = (size: number) => newSize(size);
  const handleSubmit = () => {
    if (!size) {
      setUnselected(true);
      return;
    }

    initTurn();
    newBoard();
    
    if (!user) {
      navigateTo("/login");
    } else {
      navigateTo("/game");
    }
  }

  return (
    <div className={styles.sizeButtons}>
      <span className={styles.unselected}>{unselected ? "Select a gameboard size" : null}</span>
      {TILES.map((tile) => (
          <SizeButton key={tile} size={tile} isSelected={tile===size?.size} onSelect={() => handleSizeClick(tile)} /> 
      ))}
      <Button onClick={() => handleSubmit()}>Start Game</Button>
    </div>
  )
}
