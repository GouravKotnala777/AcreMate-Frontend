import { useState } from "react";
import { findAllSlips } from "../api";


const Slips = () => {
    const [allSlips, setAllSlips] = useState([]);

    return(
        <div className="slips_bg">
            <h1>Slips</h1>
            {JSON.stringify(allSlips)}
            <button onClick={findAllSlips}>fetch</button>
        </div>
    )
};

export default Slips;