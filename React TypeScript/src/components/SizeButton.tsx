import styles from "./SizeButton.module.css";

type SizeButtonProps = {
  size: number;
  isSelected: boolean;
  onSelect: (size: number) => void;
};

export default function SizeButton({
  size,
  isSelected,
  onSelect,
}: SizeButtonProps) {
  // Conditionally apply styling if selected or not
  const styling = () => {
    return `${styles.sizeButton} ${isSelected ? styles.selected : null}`;
  };

  return (
    <div className={styling()} onClick={() => onSelect(size)}>
      {`${size}x${size}`}
    </div>
  );
}
