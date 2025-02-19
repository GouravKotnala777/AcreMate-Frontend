import { useEffect, useState } from "react";
import { findAllPlots } from "../api";
import { PlotTypes } from "../types";
import Table from "../shared/Table";


const Plots = () => {
    const [allPlotsData, setAllPlotsData] = useState<PlotTypes[]>([]);

    useEffect(() => {
        findAllPlots()
        .then((data) => {
            setAllPlotsData(data.jsonData);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);
    return(
        <div className="plots_bg">
            <h1>Plots</h1>
            <Table data={allPlotsData as PlotTypes[]} />
            {/*{JSON.stringify(allPlotsData)}*/}
            {/*<button onClick={findAllPlots}>fetch</button>*/}
        </div>
    )
};

export default Plots;