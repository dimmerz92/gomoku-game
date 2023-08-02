import { createContext } from "react";
import { Turn } from "../types";

type TurnContextProps = {
  turn?: Turn;
  initTurn: () => void;
  nextTurn: () => void;
};

const TurnContext = createContext<TurnContextProps>({} as TurnContextProps);

export default TurnContext;
