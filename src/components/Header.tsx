import { BsPerson, BsPersonCheck, BsPersonDown } from "react-icons/bs";
import { NavigateItem } from "../shared/SharedComponents";
import "../styles/components/header.component.scss";
import logo from "/public/acremate_logo6.png";
import { BiGrid, BiLogIn, BiRegistered, BiUser } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { RoutesTypes } from "../utils/types";
import { useSelectedRoute } from "../Context";
import { GiSlipknot } from "react-icons/gi";

const Header = () => {
    const {setSelectedRoute} = useSelectedRoute();
    const {setSelectedPanel} = useSelectedRoute();

    const setSelectedRouteHandler = (value:RoutesTypes|null) => {
        setSelectedPanel("main");
        setSelectedRoute(value);
    };

    return(
        <header className="header_cont">
            <NavLink to="/home" className="logo">
                <img src={logo} alt={logo} />
            </NavLink>
            <nav className="nav">
                <NavigateItem Icon={BsPerson} text={"Agents" as "agents"} url="/agents"  setSelectedRouteHandler={setSelectedRouteHandler} />
                <NavigateItem Icon={BsPersonCheck} text={"Clients" as "clients"} url="/clients" setSelectedRouteHandler={setSelectedRouteHandler} />
                <NavigateItem Icon={BsPersonDown} text={"Plots" as "plots"} url="/plots" setSelectedRouteHandler={setSelectedRouteHandler} />
                <NavigateItem Icon={GiSlipknot} text={"Slips" as "slips"} url="/slips" setSelectedRouteHandler={setSelectedRouteHandler} />
                <NavigateItem Icon={BiGrid} text={"Sites" as "sites"} url="/sites" setSelectedRouteHandler={setSelectedRouteHandler} />
                <NavigateItem Icon={BiLogIn} text={"Register" as "register"} url="/register" setSelectedRouteHandler={setSelectedRouteHandler} />
                <NavigateItem Icon={BiRegistered} text={"Login" as "login"} url="/login" setSelectedRouteHandler={setSelectedRouteHandler} />
                <NavigateItem Icon={BiUser} text={"Me" as "me"} url="/me" setSelectedRouteHandler={setSelectedRouteHandler} />
            </nav>
        </header>
    )
};

export default Header;