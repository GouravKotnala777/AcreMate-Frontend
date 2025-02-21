import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import { RoutesTypes } from "./utils/types";
import { SelectedPanelTypes } from "./components/SideBarWrapper";

interface ContextType{
    selectedRoute:RoutesTypes|null;
    setSelectedRoute:Dispatch<SetStateAction<RoutesTypes|null>>;
    selectedPanel:SelectedPanelTypes;
    setSelectedPanel:Dispatch<SetStateAction<SelectedPanelTypes>>;
}

const RouteContext = createContext<ContextType|null>(null);

export const ContextProvider = ({children}:{children:ReactNode;}) => {
    const [selectedRoute, setSelectedRoute] = useState<RoutesTypes|null>(null);
    const [selectedPanel, setSelectedPanel] = useState<SelectedPanelTypes>("main");

    return(
        <RouteContext.Provider value={{selectedRoute, setSelectedRoute, selectedPanel, setSelectedPanel}}>
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