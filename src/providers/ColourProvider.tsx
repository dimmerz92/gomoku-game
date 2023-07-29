import { Colour } from "../types";
import { ColourContext } from "../contexts";
import { useState } from "react";

type ColourProviderProps = {
    children: React.ReactNode;
}

export default function ColourProvider({ children }: ColourProviderProps) {
    const [colour, setColour] = useState<Colour | undefined>(undefined);
    const nextColour = (colour: "black" | "white") => setColour({ colour: colour });

    return (
        <ColourContext.Provider value={{colour, nextColour}}>
            { children }
        </ColourContext.Provider>
    );
}
