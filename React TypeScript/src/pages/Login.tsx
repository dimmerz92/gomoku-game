import styles from "./Login.module.css";
import users from "../data/users.json";
import { useContext, useState } from "react";
import { Button, Input } from "../components";
import { useNavigate } from "react-router-dom";
import { SizeContext, TurnContext, UserContext } from "../contexts";

export default function Login() {
  const { login } = useContext(UserContext);
  const { size } = useContext(SizeContext);
  const { initTurn } = useContext(TurnContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);

  const navigateTo = useNavigate();

  // Handle user login
  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) {
      // Give user warning prompt if incorrect credentials
      setIncorrect(true);
    } else {
      login(username);
      if (!size) {
        // Reroute user to home if no size specified
        navigateTo("/");
      } else {
        // Route to game
        initTurn();
        navigateTo("/game");
      }
    }
  };

  return (
    <form className={styles.form} onClick={(e) => e.preventDefault()}>
      <span className={styles.incorrect}>
        {incorrect ? "Incorrect username or password" : null}
      </span>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button onClick={handleLogin}>Submit</Button>
    </form>
  );
}
