import { useNavigate } from "react-router-dom";
import "../styles/shared/table.scss";
import { useSelectedRoute } from "../Context";

interface TablePropTypes<T extends object&{_id:string}>{
    data:T[];
}

const Table = <T extends object&{_id:string}>({data}:TablePropTypes<T>) => {
    const navigate = useNavigate();
    const {selectedRoute} = useSelectedRoute();

    const onClickNavigateHandler = (_id:string) => {
        if (selectedRoute?.toLowerCase() === "clients") {
            navigate(`/single-client${_id}`);
        }
        else if (selectedRoute?.toLowerCase() === "plots") {
            navigate(`/single-plot/${_id}`);
        }
        else if (selectedRoute?.toLowerCase() === "slips") {
            navigate(`/single-slip${_id}`);
        }
        else if (selectedRoute?.toLowerCase() === "sites") {
            navigate(`/single-site${_id}`);
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
                        <tr key={index} onClick={() => onClickNavigateHandler(row._id)}>
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