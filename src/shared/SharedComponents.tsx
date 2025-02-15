import { NavLink } from "react-router-dom";
import "../styles/shared_components.scss";
import { IconType } from "react-icons";
import { ChangeEvent, useState } from "react";
import { RoutesTypes } from "../types";

interface NavigateItemPropTypes {
    Icon:IconType;
    text:RoutesTypes;
    url:string;
    setSelectedRouteHandler:(value:RoutesTypes) => void;
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
    name:string;
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
    onClickHandler:() => Promise<void>;
}
interface FormSharedComponentPropTypes{
    inputArray:{label:string; name:string;}[];
    onChangeFeildsHandler:(e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => void;
    onSubmitFormHandler:() => void;
}

export const NavigateItem = ({Icon, text, url, setSelectedRouteHandler}:NavigateItemPropTypes) => {

    return(
        <NavLink to={url} className="navigate_item_cont" onClick={() => {
                setSelectedRouteHandler(text);
            }}>
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

export const Select = ({name, options, color, bgColor, border, onChangeHandler}:SelectPropTypes) => {

    return(
        <select name={name} onChange={(e) => onChangeHandler(e)}
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
        <button id="button_component" onClick={onClickHandler} style={{
            backgroundColor:bgColor?bgColor:"black",
            color:color?color:"white"
        }}>{text}</button>
    )
};

export const FormSharedComponent = ({inputArray, onChangeFeildsHandler, onSubmitFormHandler}:FormSharedComponentPropTypes) => {

    return(
        <div className="form_shared_component">
            {
                inputArray.map((inp, index) => (
                    <Input key={index} label={inp.label} name={inp.name} onChangeHandler={(e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => onChangeFeildsHandler(e)} />
                ))
            }
            <button onClick={onSubmitFormHandler}>Create Client Form</button>
        </div>
    )
}
