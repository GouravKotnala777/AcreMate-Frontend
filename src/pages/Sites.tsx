import { useEffect, useState } from "react";
import { findAllSites } from "../api";
import { SiteTypes } from "../utils/types";
import { useNavigate } from "react-router-dom";
import "../styles/pages/sites.scss";
import List from "../shared/List";


const Sites = () => {
    const [allSites, setAllSites] = useState<SiteTypes[]>([]);
    const navigate = useNavigate();

    const navigateToSinglePageHandler = (siteID:string) => {
        navigate(`/single-site?siteID=${siteID}`)
    }
    const navigateToAddPlotsHandler = () => {
        navigate(`/create?formPanelFor=plots`)
    }

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
            {/*<Table data={allSites} />*/}

            <button onClick={() => navigate("/create?formPanelFor=sites")}>Create Site</button>

            <List
                headings={[
                    {columnWidth:"17%", fieldHeading:"ID", fieldName:"_id"},
                    {columnWidth:"15%", fieldHeading:"Site Name", fieldName:"siteName"},
                    {columnWidth:"17%", fieldHeading:"Total Size", fieldName:"totalSize"},
                    {columnWidth:"17%", fieldHeading:"Sold Area", fieldName:"soldArea"},
                    {columnWidth:"17%", fieldHeading:"Info", fieldName:"info", infoNavigationHandler:navigateToSinglePageHandler, isButton:true},
                    {columnWidth:"17%", fieldHeading:"Add Plots", fieldName:"add", onClickButton:navigateToAddPlotsHandler, isButton:true}
                ]}
                data={allSites}
            />
        </div>
    )
};

export default Sites;