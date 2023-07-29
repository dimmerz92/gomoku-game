import { Size } from "../types";
import { createContext } from "react";

type SizeContextProps = {
    size?: Size;
    newSize: (size: number) => void;
}

const SizeContext = createContext<SizeContextProps>({} as SizeContextProps);

export default SizeContext;
