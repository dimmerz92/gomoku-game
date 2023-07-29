import styles from "./SizeButton.module.css";

type SizeButtonProps = {
    size: number;
    isSelected: boolean;
    onSelect: (size: number) => void;
}

export default function SizeButton({ size, isSelected, onSelect }: SizeButtonProps) {
    const styling = () => {
        return [styles.sizeButton, isSelected ? styles.selected : null].join(" ");
    }

  return (
    <div className={styling()} onClick={() => onSelect(size)}>
        {`${size}x${size}`}
    </div>
  );
}
