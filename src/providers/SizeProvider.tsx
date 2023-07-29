import { Size } from "../types";
import { SizeContext } from "../contexts";
import { useState } from "react";

type SizeProviderProps = {
    children: React.ReactNode;
}

export default function SizeProvider({ children }: SizeProviderProps) {
    const [size, setSize] = useState<Size | undefined>(undefined);
    const newSize = (size: number) => setSize({ size: size });

    return (
        <SizeContext.Provider value={{size, newSize}}>
            { children }
        </SizeContext.Provider>
    );
}
