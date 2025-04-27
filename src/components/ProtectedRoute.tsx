import { ReactElement } from "react";
import Login from "../pages/Login";


interface ProtectedRoutePropType{
    userRole?:"agent"|"admin";
    ChildElement:ReactElement;
}

const ProtectedRoute = ({userRole, ChildElement}:ProtectedRoutePropType) => {
    if (!userRole) return <Login/>;

    return ChildElement;
};

export default ProtectedRoute;