import { useState } from "react";
import { PlayerColour } from "../constants";
import { TurnContext } from "../contexts";
import { Turn } from "../types";

type TurnProviderProps = {
  children: React.ReactNode;
};

export default function TurnProvider({ children }: TurnProviderProps) {
  const [turn, setTurn] = useState<Turn | undefined>(undefined);

  // Initialises turn to black
  const initTurn = () => setTurn({ turn: PlayerColour.BLACK });

  // Changes turns between players
  const nextTurn = () => {
    setTurn({
      turn:
        turn!.turn === PlayerColour.BLACK
          ? PlayerColour.WHITE
          : PlayerColour.BLACK,
    });
  };

  return (
    <TurnContext.Provider value={{ turn, initTurn, nextTurn }}>
      {children}
    </TurnContext.Provider>
  );
}
