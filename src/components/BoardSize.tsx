import styles from "./BoardSize.module.css";
import { useContext } from "react";
import { SizeContext } from "../contexts";
import { Button, SizeButton } from ".";

const TILES = [5, 7, 9, 11];

export default function BoardSize() {
  const { size, newSize } = useContext(SizeContext);
  const handleSizeClick = (size: number) => newSize(size);
  const handleSubmit = () => console.log(size?.size);

  return (
    <>
      <div className={styles.sizeButtons}>
        {TILES.map((tile) => (
            <SizeButton key={tile} size={tile} isSelected={tile===size?.size} onSelect={handleSizeClick} /> 
        ))}
      </div>
      <Button onClick={handleSubmit}>Start Game</Button>
    </>
  )
}
