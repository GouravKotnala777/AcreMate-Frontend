import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import { RoutesTypes } from "./types";

interface ContextType{
    selectedRoute:RoutesTypes|null;
    setSelectedRoute:Dispatch<SetStateAction<RoutesTypes|null>>;
}

const RouteContext = createContext<ContextType|null>(null);

export const ContextProvider = ({children}:{children:ReactNode;}) => {
    const [selectedRoute, setSelectedRoute] = useState<RoutesTypes|null>(null);

    return(
        <RouteContext.Provider value={{selectedRoute, setSelectedRoute}}>
            {children}
        </RouteContext.Provider>
    )
};

export const useSelectedRoute = () => {
    const context = useContext(RouteContext);

    if (!context) {
        throw new Error("useClient must be used within a ClientProvider");
    }

    return context;
}


//export default ContextProvider;