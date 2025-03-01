//import { useState } from "react";
import { findAllSites } from "../api";


const Sites = () => {
    //const [allSites, setAllSites] = useState([]);



    return(
        <div className="sites_bg">
            <h1>Sites</h1>
            {/*{JSON.stringify(allSites)}*/}
            <button onClick={findAllSites}>fetch</button>
        </div>
    )
};

export default Sites;