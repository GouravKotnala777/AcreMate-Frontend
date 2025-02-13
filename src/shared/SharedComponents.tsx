import { NavLink } from "react-router-dom";
import "../styles/shared.scss";
import { IconType } from "react-icons";
import { ChangeEvent, useState } from "react";

interface NavigateItemPropTypes {
    Icon:IconType;
    text:string;
    url:string;
}
interface HeadingPropTypes {
    text:string;
    color?:string;
    bgColor?:string;
    textAlign?:CanvasTextAlign;
}
interface InputPropTypes {
    label:string;
    name:string;
    labelBG?:string;
    inputBG?:string;
    onChangeHandler:(e:ChangeEvent<HTMLInputElement>) => void;
}
interface SelectPropTypes {
    options:string[];
    color?:string;
    bgColor?:string;
    border?:string;
    onChangeHandler:(e:ChangeEvent<HTMLSelectElement>) => void;
}
interface ButtonPropTypes {
    text:string;
    color?:string;
    bgColor?:string;
    onClickHandler:() => void;
}

export const NavigateItem = ({Icon, text, url}:NavigateItemPropTypes) => {

    return(
        <NavLink to={url} className="navigate_item_cont">
            <div className="icon"><Icon/></div>
            <div className="text">{text}</div>
        </NavLink>
    )
};

export const Heading = ({text, color, bgColor, textAlign}:HeadingPropTypes) => {
    return(
        <h1 className="heading"
            style={{
                color:color?color:"black",
                backgroundColor:bgColor?bgColor:"transparent",
                textAlign:textAlign?textAlign:"left"
            }}
        >{text}</h1>
    )
};

export const Input = ({label, name, inputBG, labelBG, onChangeHandler}:InputPropTypes) => {
    const [focused, setIsFocused] = useState<boolean>(false);
    const [isFilled, setIsFilled] = useState<boolean>(false);

    //const checkState = (id:string) => {

    //};

    return(
        <div className="input_cont">
            <input type="text" name={name}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => {
                    if (e.target.value) {
                        setIsFilled(true);
                    }
                    else{
                        setIsFilled(false);
                    }
                    onChangeHandler(e);
                }}
                style={{
                    border:focused?"2px solid rgb(78, 255, 175)":"1px solid rgb(78, 255, 175)",
                    backgroundColor:inputBG?inputBG:"transparent"
                }}
            />
            <label style={{
                top:
                    isFilled?"-17%"
                    :
                        focused?"-17%"
                        :
                        "15%",
                left:
                    isFilled?"2%"
                    :
                        focused?"2%"
                        :
                        "3%",
                fontSize:
                        isFilled?"0.7rem"
                        :
                            focused?"0.7rem"
                            :
                            "1rem",
                backgroundColor:labelBG?labelBG:"white"
            }}>{label}</label>
        </div>
    )
};

export const Select = ({options, color, bgColor, border, onChangeHandler}:SelectPropTypes) => {

    return(
        <select onChange={(e) => onChangeHandler(e)}
            style={{
                border:border?border:"1px solid transparent",
                backgroundColor:bgColor?bgColor:"transparent",
                color:color?color:"black"
            }}
        >
            <option>Select</option>
            {
                options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))
            }
        </select>
    )
};

export const Button = ({text, color, bgColor, onClickHandler}:ButtonPropTypes) => {
    return(
        <button onClick={onClickHandler} style={{
            backgroundColor:bgColor?bgColor:"black",
            color:color?color:"white"
        }}>{text}</button>
    )
}
