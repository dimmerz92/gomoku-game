import styles from "./Header.module.css";
import { useContext } from "react";
import { UserContext } from "../contexts";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const navigateTo = useNavigate();

  const handleLogout = () => {
    logout();
    navigateTo("/");
  };

  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.h1} onClick={() => navigateTo("/")}>
          Gomoku
        </h1>
      </div>
      <div />
      <nav className={styles.nav}>
        <div
          className={styles.navLink}
          onClick={() => (!user ? navigateTo("/login") : handleLogout())}>
          {!user ? "Login" : "Logout"}
        </div>
        {!user ? null : (
          <div className={styles.navLink} onClick={() => navigateTo("/games")}>
            Previous Games
          </div>
        )}
      </nav>
    </header>
  );
}
