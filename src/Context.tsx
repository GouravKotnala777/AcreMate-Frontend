import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import { UserTypes } from "./utils/types";

interface ContextType{
    loginUser:UserTypes|null;
    setLoginUser:Dispatch<SetStateAction<UserTypes|null>>;
}

const RouteContext = createContext<ContextType|null>(null);

export const ContextProvider = ({children}:{children:ReactNode;}) => {
    const [loginUser, setLoginUser] = useState<UserTypes|null>(null);

    return(
        <RouteContext.Provider value={{loginUser, setLoginUser}}>
            {children}
        </RouteContext.Provider>
    )
};

export const useLoginUser = () => {
    const context = useContext(RouteContext);

    if (!context) {
        throw new Error("useClient must be used within a ClientProvider");
    }

    return context;
}


//export default ContextProvider;