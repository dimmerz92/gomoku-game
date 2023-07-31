import { Gameboard } from "../types";
import { GameboardContext, SizeContext, TurnContext } from "../contexts";
import { useContext, useState } from "react";
import { GameStatus, PlayerColour } from "../constants";

type GameboardProviderProps = {
    children: React.ReactNode;
}

export default function GameboardProvider({ children }: GameboardProviderProps) {
    const { size } = useContext(SizeContext);
    const { turn } = useContext(TurnContext);
    const [gameboard, setGameboard] = useState<Gameboard | undefined>(undefined);
    const [status, setStatus] = useState<GameStatus>(GameStatus.NOT_OVER);

    const diagCheck = (cellId: number, direction: number): number => {
        if (cellId < 0 || cellId > size!.size**2) return 0;
        if (gameboard!.gameboard[cellId] !== turn!.turn) return 0;
        return 1 + diagCheck(cellId + direction, direction);
    }

    const linearCheck = (index: number, row: boolean = false): boolean => {
        let arr: PlayerColour[] = [];
        if (row) {
            arr = gameboard!.gameboard.slice(index, size!.size);
        } else {
            for (let i = index; i < gameboard!.gameboard.length; i += size!.size) {
                arr.push(gameboard!.gameboard[i]);
            }
        }

        if (size!.size === 5) return arr.every(i => i === turn!.turn);
        for (let i = 0; i < size!.size - 5; i++) {
            if (arr.slice(i, i + 5).every(j => j === turn!.turn)) return true;
        }
        return false;
    }

    const newBoard = () => {
        setGameboard({ gameboard: Array(size!.size**2).fill(undefined) });
        setStatus(GameStatus.NOT_OVER);
    }
    const addTurn = (id: number) => {
        gameboard!.gameboard[id] = turn!.turn;
        checkStatus(id);
    }
    const checkStatus = (id: number) => {
        const row = Math.floor(id / size!.size);
        const col = id % size!.size;
        const leftDiag = diagCheck(id, size!.size + 1) + diagCheck(id, -(size!.size + 1)) - 1;
        const rightDiag = diagCheck(id, size!.size - 1) + diagCheck(id, -(size!.size - 1)) - 1;
        console.log(`left: ${leftDiag}\tright: ${rightDiag}`)
        if (rightDiag === 5 || leftDiag === 5) setStatus(GameStatus.WIN);
        if (linearCheck(col) || linearCheck(row, true)) setStatus(GameStatus.WIN);
        if (gameboard!.gameboard.every(i => i !== undefined)) setStatus(GameStatus.DRAW);
    }

    return (
        <GameboardContext.Provider value={{gameboard, status, newBoard, addTurn, checkStatus}}>
            { children }
        </GameboardContext.Provider>
    );
}
