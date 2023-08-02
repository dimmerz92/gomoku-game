import { User } from "../types";
import { UserContext } from "../contexts";
import { useState } from "react";
import { GameboardProvider } from ".";

type UserProviderProps = {
  children: React.ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = (username: string) => {
    setUser({ user: username });
  };
  const logout = () => {
    setUser(undefined);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {user ? <GameboardProvider>{children}</GameboardProvider> : children}
    </UserContext.Provider>
  );
}
