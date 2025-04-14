import { useEffect, useState } from "react";
import { findAllPlots } from "../api";
import { PlotTypes } from "../utils/types";
import Table from "../shared/Table";

// I HAVE TO DELETE THIS WHOLE PAGE IT IS NOT IN USE

const Plots = () => {
    const [allPlotsData, setAllPlotsData] = useState<PlotTypes[]>([]);

    useEffect(() => {
        findAllPlots("plotID") // wrote only to remove error, we will delete this whole page
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