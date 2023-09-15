import styles from "./SizeButton.module.css";

type SizeButtonProps = {
  size: number;
  selected: boolean;
  onSelect: (size: number) => void;
}

export default function SizeButton
  ({ size, selected, onSelect }: SizeButtonProps) {
    // Conditionally apply styling if selected or not
    const styling = () => {
      return `${styles.sizeButton} ${selected ? styles.selected : null}`;
    }

    return (
      <div className={styling()} onClick={() => onSelect(size)}>
        {`${size}x${size}`}
      </div>
    );
}
