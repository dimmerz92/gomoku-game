import styles from "./Login.module.css";
import { useContext, useState } from "react";
import { Button, Input } from "../components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts";

export default function Register() {
  const { register } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigateTo = useNavigate();

  // Handle user register
  const handleRegister = async () => {
    setErrorMessage("");
    const result = await register(username, password);
    if (result === true) {
      navigateTo("/");
    } else {
      setErrorMessage(result);
    }
  }

  return (
    <form className={styles.form} onClick={(e) => e.preventDefault()}>
      <span className={styles.incorrect}>
        {errorMessage ? errorMessage : null}
      </span>
      <Input
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setErrorMessage("");
          }
        }
        placeholder="Username"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrorMessage("");
          }
        }
        placeholder="Password"
      />
      <Button onClick={handleRegister}>Submit</Button>
    </form>
  );
}
