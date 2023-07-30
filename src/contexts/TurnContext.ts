import { createContext } from "react";
import { PlayerColour } from "../constants";
import { Turn } from "../types";

type TurnContextProps = {
    turn?: Turn;
    nextTurn: (turn: PlayerColour) => void;
}

const TurnContext = createContext<TurnContextProps>({} as TurnContextProps);

export default TurnContext;
