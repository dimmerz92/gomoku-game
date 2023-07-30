import { User, Games, Game } from "../types";
import { createContext } from "react";

type UserContextProps = {
    user?: User;
    games?: Games;
    login: (username: string, history: object[]) => void;
    logout: () => void;
    parseGames: (gamesList: {}[]) => void;
    addGame: (game: Game) => void;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export default UserContext;
