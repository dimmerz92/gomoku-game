import { useLocalStorage } from "../hooks";
import { UserContext } from "../contexts";
import { User, Credential } from "../types";
import { post, setToken } from "../utils/http";
import GameboardProvider from "./GameboardProvider";
import { API_HOST } from "../constants";

type UserProviderProps = {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useLocalStorage<User | undefined>("user", undefined);
  if (user) {
    setToken(user.token);
  }

  // Updates user state with username on log in
  const login = async (username: string, password: string) => {
    try {
      const user = await post<Credential, User>(`${API_HOST}/api/auth/login`, {
        username,
        password
      });
      setUser(user);
      setToken(user.token);
      return true;
    } catch (error) {
      if (error instanceof Error) return error.message;
      return "Unable to login at the moment, try agian later";
    }
  }
  
  const register = async (username: string, password: string) => {
    try {
      const user = await post<Credential, User>(`${API_HOST}/api/auth/register`, {
        username,
        password
      });
      setUser(user);
      setToken(user.token);
      return true;
    } catch (error) {
      if (error instanceof Error) return error.message;
      return "Unable to register at the moment, try again later";
    }
  }

  // Updates user state to undefined on log out
  const logout = () => {
    setUser(undefined);
    setToken("");
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {user ? <GameboardProvider>{children}</GameboardProvider> : children}
    </UserContext.Provider>
  );
}
