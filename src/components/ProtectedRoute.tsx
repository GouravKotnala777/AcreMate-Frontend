import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface ProtectedRoutePropType{
    userRole?:"agent"|"admin";
    ChildElement:ReactElement;
}

const ProtectedRoute = ({userRole, ChildElement}:ProtectedRoutePropType) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!userRole) {navigate("/login"); return;}
    }, []);

    return ChildElement;
};

export default ProtectedRoute;