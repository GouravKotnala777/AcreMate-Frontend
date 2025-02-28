import { NavLink } from "react-router-dom";
import "../styles/shared_components.scss";
import { IconType } from "react-icons";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { RoutesTypes, SlipTypes, UpdateSlipBodyTypes } from "../utils/types";
import { BG_COLOR, PRIMARY_DARK } from "../utils/constants";
import { updateSlip } from "../api";

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
    width?:string;
    onClickHandler:() => Promise<void>;
}
interface FormSharedComponentPropTypes{
    inputArray:{type:"text"|"number"|"select"; label:string; name:string; selectionOptionArray?:string[]}[];
    onChangeFeildsHandler:(e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => void;
    onSubmitFormHandler:() => void;
}
interface TimerPropTypes{
    bgColor?:string;
    duration?:number;
    monthsCovered?:number;
}
interface KeyValuePairsPropTypes{
    keyValuePairArray:Record<string, string|number|undefined>[];
    color?:string;
    isLoading?:boolean;
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

export const Button = ({text, color, bgColor, width, onClickHandler}:ButtonPropTypes) => {
    return(
        <button id="button_component" onClick={onClickHandler} style={{
            backgroundColor:bgColor?bgColor:"black",
            color:color?color:"white",
            width:width?width:"unset"
        }}>{text}</button>
    )
};

export const FormSharedComponent = ({inputArray, onChangeFeildsHandler, onSubmitFormHandler}:FormSharedComponentPropTypes) => {

    return(
        <div className="form_shared_component">
            {
                inputArray.map((inp, index) => (
                    (inp.type === "text"||inp.type === "number")?
                        <Input key={index}  label={inp.label} name={inp.name} labelBG={BG_COLOR} onChangeHandler={(e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => onChangeFeildsHandler(e)} />
                        :
                        (inp.type === "select")?
                            <Select
                                key={index}
                                name={inp.name}
                                border="1px solid rgb(78, 255, 175)"
                                options={inp.selectionOptionArray as string[]}
                                onChangeHandler={(e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => onChangeFeildsHandler(e)}
                            />
                            :
                            <h3 key={index}>input type = "{inp.type}"</h3>
                ))
            }
            <button onClick={onSubmitFormHandler}>Create Client Form</button>
        </div>
    )
};

export const Timer = ({bgColor, monthsCovered, duration}:TimerPropTypes) => {

    return(
        <div className="timer_cont">
            <div className="timer_heading">
                Time Left
            </div>
            <div className="timer_value">
                <div className="watch_outer" style={{
                        background:
                        (monthsCovered&&duration)?
                            bgColor?
                                `conic-gradient(${bgColor} 0deg ${360/duration}deg, #00ff00 ${360/duration}deg 360deg)`
                                :
                                `conic-gradient(#00ff0020 0deg 100deg, #00ff00 100deg 360deg)`
                            :
                            "#eeeeee"
                                
                                
                    }}>
                    <div className="watch_inner">
                        {monthsCovered}/{duration}
                    </div>
                </div>
            </div>
        </div>
    )
};

export const Skeleton = () => {
    return(
        <div className="skeleton_cont">

        </div>
    )
};

export const KeyValuePairs = ({keyValuePairArray, color, isLoading}:KeyValuePairsPropTypes) => {

    return(
        <div className="key_value_pairs_cont">
            {
                keyValuePairArray.map((item, index) => (
                    <div className="key_value_pair_cont" key={index}>
                        <div className="key">{Object.keys(item)[0]}:</div>
                        <div className="value" style={{
                            color:color?color:"unset"
                        }}>{
                            isLoading?
                                <Skeleton />
                                :
                                Object.values(item)[0]
                        }</div>
                    </div>
                ))
            }
        </div>
    )
};

export const DialogBox = ({isOpen, setIsOpen, updateItemID, setAllSlipsData}:{setAllSlipsData:Dispatch<SetStateAction<SlipTypes[]>>; isOpen:boolean; setIsOpen:Dispatch<SetStateAction<boolean>>; updateItemID?:string;}) => {
    const [editSlipFormData, setEditSlipFormData] = useState<UpdateSlipBodyTypes>({slipID:""});
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        if (e.target.name === "isCancelled") {
            setEditSlipFormData({...editSlipFormData, [e.target.name]:e.target.value === "true"})
        }
        else{
            setEditSlipFormData({...editSlipFormData, [e.target.name]:e.target.value})
        }
    };

    const onClickHandler = async() => {
        console.log({...editSlipFormData, slipID:updateItemID as string});
        
        const aa = await updateSlip({...editSlipFormData, slipID:updateItemID as string});
        console.log(aa);
        setAllSlipsData((prev) => [...prev.map((iter) => iter._id !== aa.jsonData._id?iter:aa.jsonData)]);
        setIsOpen(false);
    };

    if (!updateItemID) return null;

    return(
        <div className="dialog_backdrop_cont" style={{display:isOpen?"block":"none"}} onClick={() => setIsOpen(false)}>
            <div className="dialog_cont" onClick={(e) => {e.stopPropagation();}}>
                <Heading text="Edit Slip" />
                <label className="dialog_label">Slip Type</label>
                <Select border={`1px solid ${PRIMARY_DARK}`} name="slipType" options={["downpay", "token", "emi"]} onChangeHandler={onChangeHandler} />
                <label className="dialog_label">Is Cancelled</label>
                <Select border={`1px solid ${PRIMARY_DARK}`} name="isCancelled" options={["true", "false"]} onChangeHandler={onChangeHandler} />
                <label className="dialog_label">Cancellation Reason</label>
                <Select border={`1px solid ${PRIMARY_DARK}`} name="cancelledFor" options={["bounced", "cash not received", "transaction failed"]} onChangeHandler={onChangeHandler} />
                <Input label="Remark" name="remark" onChangeHandler={onChangeHandler} />
                <Button text="Update Slip" width="100%" onClickHandler={onClickHandler} />
            </div>
        </div>
    )
};