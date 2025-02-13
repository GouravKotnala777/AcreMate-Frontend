import { useState } from "react";
import { findAllPlots } from "../api";


const Plots = () => {
    const [allPlots, setAllPlots] = useState([]);

    return(
        <div className="plots_bg">
            <h1>Plots</h1>
            {JSON.stringify(allPlots)}
            <button onClick={findAllPlots}>fetch</button>
        </div>
    )
};

export default Plots;