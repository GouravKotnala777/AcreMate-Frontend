import { BsPerson, BsPersonCheck, BsPersonDown } from "react-icons/bs";
import NavigateItem from "../shared/NavigatItem";
import "../styles/components/header.component.scss";
import logo from "/public/acremate_logo6.png";
import { BiGrid, BiLogIn } from "react-icons/bi";

const Header = () => {

    return(
        <header className="header_cont">
            <div className="logo">
                <img src={logo} alt={logo} />
            </div>
            <nav className="nav">
                <NavigateItem Icon={BsPerson} text="Agent" />
                <NavigateItem Icon={BsPersonCheck} text="Client" />
                <NavigateItem Icon={BsPersonDown} text="Plots" />
                <NavigateItem Icon={BiGrid} text="Sites" />
                <NavigateItem Icon={BiLogIn} text="Login" />
            </nav>
        </header>
    )
};

export default Header;