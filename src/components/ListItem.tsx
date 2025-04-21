//import { useEffect, useState } from "react";
import "../styles/components/list_item.scss";
import { IconType } from "react-icons";


interface ListItemTypes {
    cellWidth:string[];
    row:{
        itemValue:unknown;
        isDate?:boolean;
        isButton?:boolean;
        onClickHanlder?:()=>void;
        btnIcon?:IconType;
        style?:{
            color?:string;
            backgroundColor?:string;
            fontWeight?:string;
        };
    }[];
}

const ListItem = ({cellWidth, row}:ListItemTypes) => {
    //const [itemArray, setItemArray] = useState<{
    //    itemValue:unknown;
    //    isDate?:boolean;
    //    isButton?:boolean;
    //    onClickHanlder?:()=>void;
    //    btnIcon?:IconType;
    //    style?:{
    //        color?:string;
    //        backgroundColor?:string;
    //    };
    //}[]>([]);

    //useEffect(() => {
    //    setItemArray(row)
    //}, []);

    return(
        <div className="list_item_cont" style={{
            gridTemplateColumns:cellWidth.join("")
        }}>
            {
                row.map((i, ind) => (
                    <>
                        {
                            i.isButton ?
                                <button className="cell_btn" key={ind} style={i.style} onClick={i.onClickHanlder}>
                                    {i.btnIcon?<i.btnIcon />:(i.itemValue as string)}
                                </button>
                                :
                                i.isDate ?
                                    <div className="cell" key={ind} style={i.style}>
                                        {new Date(i.itemValue as string).toLocaleDateString("en-GB")}
                                    </div>
                                    :
                                    <div className="cell" key={ind} style={i.style}>
                                        {i.itemValue as string}
                                    </div>
                        }
                    </>
                ))
            }
        </div>
    )
};

export default ListItem;