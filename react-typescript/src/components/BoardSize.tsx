import styles from "./BoardSize.module.css";
import { useContext, useState } from "react";
import { GameboardContext, UserContext } from "../contexts";
import { Button, SizeButton } from ".";
import { useNavigate } from "react-router-dom";

const TILES = [5, 7, 9, 11];

export default function BoardSize() {
  const { newBoard } = useContext(GameboardContext);
  const { user } = useContext(UserContext);
  const [size, setSize] = useState<number | undefined>(undefined);
  const [unselected, setUnselected] = useState<boolean>(false);
  const navigateTo = useNavigate();

  // Handle clicks on the submit button
  const handleSubmit = () => {
    // If nothing selected, show error message
    if (!size) setUnselected(true);

    // Route to Game page or reroute to login if not logged in
    if (!user) {
      navigateTo("/login");
    } else {
      newBoard(size!, () => {
        navigateTo("/game");
      });
    }
  }

  return (
    <div className={styles.sizeButtons}>
      <span className={styles.unselected}>
        {unselected ? "Select a gameboard size" : null}
      </span>
      {TILES.map((tile) => (
        <SizeButton key={tile} size={tile} selected={tile === size}
          onSelect={() => setSize(tile)}
        />
      ))}
      <Button onClick={() => handleSubmit()}>Start Game</Button>
    </div>
  );
}
