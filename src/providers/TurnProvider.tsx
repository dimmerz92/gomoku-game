import { useState } from "react";
import { PlayerColour } from "../constants";
import { TurnContext } from "../contexts";
import { Turn } from "../types";

type TurnProviderProps = {
    children: React.ReactNode;
}

export default function ColourProvider({ children }: TurnProviderProps) {
    const [turn, setTurn] = useState<Turn | undefined>(undefined);
    const nextTurn = (turn: PlayerColour) => setTurn({ turn: turn });

    return (
        <TurnContext.Provider value={{turn, nextTurn}}>
            { children }
        </TurnContext.Provider>
    );
}
