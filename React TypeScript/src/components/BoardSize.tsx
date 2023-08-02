import styles from "./BoardSize.module.css";
import { useContext, useState } from "react";
import {
  GameboardContext,
  SizeContext,
  TurnContext,
  UserContext,
} from "../contexts";
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

  // Handle clicks on size tiles
  const handleSizeClick = (size: number) => newSize(size);

  // Handle clicks on the submit button
  const handleSubmit = () => {
    if (!size) {
      // if nothing selected, return error prompting
      setUnselected(true);
      return;
    }

    // Route to Game page or reroute to login if not logged in
    if (!user) {
      navigateTo("/login");
    } else {
      initTurn();
      newBoard();
      navigateTo("/game");
    }
  };

  return (
    <div className={styles.sizeButtons}>
      <span className={styles.unselected}>
        {unselected ? "Select a gameboard size" : null}
      </span>
      {TILES.map((tile) => (
        <SizeButton
          key={tile}
          size={tile}
          isSelected={tile === size?.size}
          onSelect={() => handleSizeClick(tile)}
        />
      ))}
      <Button onClick={() => handleSubmit()}>Start Game</Button>
    </div>
  );
}
