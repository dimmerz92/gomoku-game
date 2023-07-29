import styles from "./Headers.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
        <div>
            <h1>Gomoku</h1>
        </div>
        <div className="headerSpacer" />
        <nav className="nav">
            Login, Previous Games
        </nav>
    </header>
  );
}
