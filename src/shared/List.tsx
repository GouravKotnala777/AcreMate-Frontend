import { CSSProperties, ReactNode, useState } from "react";
import "../styles/shared/list.scss";
import { PRIMARY_LIGHT } from "../utils/constants";
import { BiDownArrow } from "react-icons/bi";

type PrimitiveType = string|number|boolean|null|undefined|Date;
type FlattenObjectType = {
    [key:string]:unknown;
}
interface ListPropTypes<T> {
    headings:{
        fieldHeading:string;
        fieldName:string;
        columnWidth:string;
        isDate?:boolean;
        isButton?:boolean;
        onClickButton?:() => void;
        style?:CSSProperties;
        remarkValue?:string;
        infoNavigationHandler?:(plotID:string)=>void;
    }[];
    data:T[];
    hasRemark?:boolean;
}

const List = <T extends {[key:string]:unknown}>({headings, data, hasRemark}:ListPropTypes<T>) => {
    const [activeRemarkRow, setActiveRemarkRow] = useState<string>("");

    const flattenObject = (obj:T, ParentKey:string="", result:FlattenObjectType={}) => {
        for(const key in obj){
            if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
            //if (key === "_id") continue;

            const newKey = ParentKey ? `${key}` : key;
            const value = obj[key];

            if (
                typeof value === "object" &&
                value !== null &&
                !Array.isArray(value) &&
                !(value instanceof Date)
            ) {
                flattenObject(value as T, newKey, result);
            }
            else{
                result[newKey] = value as PrimitiveType;
            }
        }

        return result;
    };

    const renderRow = (obje:T) => {
        let reactNodeArr:ReactNode[] = [];

        const transformedObj = flattenObject(obje);

        reactNodeArr = headings.map(({fieldName, isDate, isButton, onClickButton, infoNavigationHandler, style}, index) => {
            return isButton && infoNavigationHandler && fieldName === "info" ? 
                        <div className="send_sms slip_info slip_info_heading">
                            <button className="send_sms_btn" onClick={() => infoNavigationHandler(obje._id as string)}>{fieldName}</button>
                        </div>
                        :
                        isButton && fieldName !== "info" ? 
                            <div className="send_sms slip_info slip_info_heading">
                                <button className="send_sms_btn" onClick={onClickButton}>{fieldName}</button>
                            </div>
                            :
                            (transformedObj[fieldName] === undefined || transformedObj[fieldName] === null || transformedObj[fieldName] === "") ? 
                                <p>"nothing ok"</p>
                                :
                                isDate ? 
                                    <p key={index}>{new Date(transformedObj[fieldName] as string).toLocaleDateString("en-GB")}</p>
                                    :
                                    isButton ? 
                                        <p key={index}>{new Date(transformedObj[fieldName] as string).toLocaleDateString("en-GB")}</p>
                                        :
                                        style ?
                                            <p key={index} style={style}>{transformedObj[fieldName] as string}</p>
                                            :
                                            <p key={index}>{transformedObj[fieldName] as string}</p>
        });

        return reactNodeArr;
    };

    const remarkToggleHandler = (rowID:string) => {
        const selectedRow = document.getElementById(rowID);
        if (!selectedRow) return;

        setActiveRemarkRow(rowID);
    };

    return(
        <>
            <div className="list_cont">
                <div className="list_item" style={{
                    backgroundColor:PRIMARY_LIGHT,
                    gridTemplateColumns:headings.map((hdng) => hdng.columnWidth).join(" ")
                }}>
                    {
                        headings.map(({fieldHeading}) => (
                            <div className="slip_no slip_info slip_info_heading">{fieldHeading}</div>
                        ))
                    }
                    {/*{hasRemark && <div className="slip_no slip_info slip_info_heading">Remark</div>}*/}
                </div>
                {
                    data.map((plt, index) => (
                        <>    
                            <div className="list_item" key={index} style={{
                                gridTemplateColumns:headings.map((hdng) => hdng.columnWidth).join(" ")
                            }}>

                                {renderRow(plt)}
                                
                                {
                                    hasRemark && headings[index].remarkValue &&
                                        <button className="remark_toggler"
                                            onClick={() => remarkToggleHandler(`reee${index}`)}>
                                            <BiDownArrow />
                                        </button>
                                }



                                {
                                    hasRemark && headings[index].remarkValue &&
                                        <div id={`reee${index}`} className="remark_section"
                                            style={{
                                                transform:activeRemarkRow === `reee${index}` ?
                                                    "scale(1, 1)"
                                                    :
                                                    "scale(1, 0)",
                                                height:activeRemarkRow === `reee${index}` ?
                                                    "50px"
                                                    :
                                                    "0px"
                                            }}
                                        >
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, quo laudantium et necessitatibus impedit sint facere quasi saepe modi deserunt numquam repellat distinctio, sunt nihil ipsam quidem aut magni excepturi?
                                        </div>
                                }
                            </div>
                        </>
                    ))
                }
            </div>
        </>
    )
};

export default List;