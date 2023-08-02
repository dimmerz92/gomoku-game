import { User } from "../types";
import { createContext } from "react";

type UserContextProps = {
  user?: User;
  login: (username: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export default UserContext;
