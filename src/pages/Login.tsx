import styles from "./Login.module.css";
import users from "../data/users.json";
import { useState } from "react";
import { Button, Input } from "../components";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);

  const navigateTo = useNavigate();

  const handleLogin = () => {
    const user = users.find((u) => u.username === username && u.password === password);
    !user ? setIncorrect(true) : navigateTo("/game");
  }

  return (
    <form className={styles.form} onClick={(e) => e.preventDefault()}>
      <span className={styles.incorrect}>{incorrect ? "Incorrect username or password": null}</span>
      <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <Button onClick={handleLogin}>Submit</Button>
    </form>
  );
}
