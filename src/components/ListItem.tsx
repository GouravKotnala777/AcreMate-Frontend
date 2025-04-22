//import { useEffect, useState } from "react";
import "../styles/components/list_item.scss";
import { IconType } from "react-icons";


interface ListItemTypes {
    uniqeKey?:string;
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

const ListItem = ({uniqeKey, cellWidth, row}:ListItemTypes) => {

    return(
        <div className="list_item_cont" key={uniqeKey} style={{
            gridTemplateColumns:cellWidth.join("")
        }}>
            {
                row.map((i, ind) => (
                    <div key={`${uniqeKey}-${ind}`}>
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
                    </div>
                ))
            }
        </div>
    )
};

export default ListItem;