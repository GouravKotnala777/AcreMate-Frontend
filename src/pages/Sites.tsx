import { useEffect, useState } from "react";
import { findAllSites } from "../api";
import { SiteTypes } from "../utils/types";
import Table from "../shared/Table";


const Sites = () => {
    const [allSites, setAllSites] = useState<SiteTypes[]>([]);


    useEffect(() => {
        findAllSites()
        .then((data) => {
            setAllSites(data.jsonData);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return(
        <div className="sites_bg">
            <h1>Sites</h1>
            {/*<pre>{JSON.stringify(allSites, null, `\t`)}</pre>*/}
            <Table data={allSites} />
        </div>
    )
};

export default Sites;