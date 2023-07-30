import { User, Games, Game } from "../types";
import { UserContext } from "../contexts";
import { useState } from "react";

type UserProviderProps = {
    children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [games, setGames] = useState<Games>({ games: [] } as Games);

    const login = (username: string, history: object[]) => {
        parseGames(history)
        setUser({ user: username });
    }
    const logout = () => {
        setUser(undefined);
        setGames({ games: [] } as Games);
    }
    const parseGames = (gamesList: {}[]) => {
        gamesList.forEach((game) => {
            setGames((prev) => { return {games: [...prev!.games, game as Game] } })
        })
    }
    const addGame = (game: Game) => setGames((prev) => { return { games: [...prev!.games, game ] } });

    return (
        <UserContext.Provider value={{user, games, login, logout, parseGames, addGame}}>
            { children }
        </UserContext.Provider>
    );
}
