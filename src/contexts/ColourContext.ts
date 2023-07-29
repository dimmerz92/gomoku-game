import { Colour } from "../types";
import { createContext } from "react";

type ColourContextProps = {
    colour?: Colour;
    nextColour: (colour: "black" | "white") => void;
}

const ColourContext = createContext<ColourContextProps>({} as ColourContextProps);

export default ColourContext;
