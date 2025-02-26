import { useNavigate } from "react-router-dom";
import "../styles/shared/table.scss";
import { useSelectedRoute } from "../Context";

interface TablePropTypes<T extends object&{_id:string, siteName?:string}>{
    data:T[];
}

const Table = <T extends object&{_id:string}>({data}:TablePropTypes<T>) => {
    const navigate = useNavigate();
    const {selectedRoute} = useSelectedRoute();

    const onClickNavigateHandler = ({
        clientID, plotID, slipID, agentID, siteID
    }:{
        clientID?:string;
        plotID?:string;
        slipID?:string;
        siteID?:string;
        agentID?:string;
    }) => {
        if (selectedRoute?.toLowerCase() === "clients") {
            navigate(`/single-plot?clientID=${clientID}`);
        }
        else if (selectedRoute?.toLowerCase() === "plots") {
            navigate(`/single-plot?plotID=${plotID}`);
        }
        else if (selectedRoute?.toLowerCase() === "slips") {
            navigate(`/single-plot?slipID=${slipID}`);
        }
        else if (selectedRoute?.toLowerCase() === "sites") {
            navigate(`/single-site?siteID=${siteID}`);
        }
        else if (selectedRoute?.toLowerCase() === "agents") {
            navigate(`/single-agent?agentID=${agentID}`);
        }
        else {
            alert(`selectedRoute is ${selectedRoute?.toLowerCase()}`);
        }
    }

    return(
        <table className="table_cont">
            <thead>
                <tr>
                    {
                        Object.keys(data[0]||{}).map((th) => (
                                <th key={th} scope="col">{th}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((row, index) => (
                        <tr key={index} onClick={() => onClickNavigateHandler(
                            selectedRoute === "C"+"lients"?
                                {clientID:row._id}
                                :
                                selectedRoute === "P"+"lots"?
                                    {plotID:row._id}
                                    :
                                    selectedRoute === "S"+"lips"?
                                        {slipID:row._id}
                                        :
                                        selectedRoute === "A"+"gents"?
                                            {agentID:row._id}
                                            :
                                            selectedRoute === "S"+"ites"?
                                                {siteID:row._id}
                                                :
                                                {plotID:selectedRoute as ""}
                                
                        )}>
                            {Object.values(row).map((val, idx) => (
                                idx === 0?
                                <td key={idx}>A</td>
                                :
                                <td key={idx}>{String(val)}</td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
};

export default Table;