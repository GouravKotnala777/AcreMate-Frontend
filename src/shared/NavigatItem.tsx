import "../styles/shared.scss";
import { IconType } from "react-icons";

interface NavigateItemPropTypes {
    Icon:IconType;
    text:string;
}

const NavigateItem = ({Icon, text}:NavigateItemPropTypes) => {

    return(
        <div className="navigate_item_cont">
            <div className="icon"><Icon/></div>
            <div className="text">{text}</div>
        </div>
    )
};

export default NavigateItem;