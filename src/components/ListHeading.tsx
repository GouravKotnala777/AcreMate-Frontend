import "../styles/components/list_item.scss";

interface ListHeadingPropTypes{
    headingRow:{
        itemValue:string; itemWidth:string;
    }[];
}


const ListHeading = ({headingRow}:ListHeadingPropTypes) => {

    return(
        <div className="list_heading_cont" style={{
            gridTemplateColumns:headingRow.map((w) => w.itemWidth).join("")
        }}>
            {
                headingRow.map((hdng, index) => (
                    <div className="cell" key={index}>
                        {hdng.itemValue}
                    </div>
                ))
            }
        </div>
    )
};

export default ListHeading;