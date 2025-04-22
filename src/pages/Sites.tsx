import { useEffect, useState } from "react";
import { findAllSites } from "../api";
import { SiteTypes } from "../utils/types";
import { useNavigate } from "react-router-dom";
import "../styles/pages/sites.scss";
import ListHeading from "../components/ListHeading";
import ListItem from "../components/ListItem";
import { BsInfo } from "react-icons/bs";
import { CgAdd } from "react-icons/cg";
import { ScrollableContainer } from "../shared/SharedComponents";


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

            <ScrollableContainer>
                <ListHeading
                    headingRow={[
                        {itemValue:"ID", itemWidth:"16%"},
                        {itemValue:"Site Name", itemWidth:"16%"},
                        {itemValue:"Total Size", itemWidth:"16%"},
                        {itemValue:"Sold Area", itemWidth:"16%"},
                        {itemValue:"Info", itemWidth:"16%"},
                        {itemValue:"Add Plots", itemWidth:"16%"}
                    ]}
                />

                {
                    allSites.map((st, index) => (
                        <ListItem
                            key={`${st._id}-${index}`}
                            uniqeKey={st._id}
                            cellWidth={[
                                "16%",
                                "16%",
                                "16%",
                                "16%",
                                "16%",
                                "16%"
                            ]}
                            row={[
                                {itemValue:st._id},
                                {itemValue:st.siteName},
                                {itemValue:st.totalSize},
                                {itemValue:st.soldArea},
                                {itemValue:"info", isButton:true, btnIcon:BsInfo, onClickHanlder:()=>navigateToSinglePageHandler(st._id)},
                                {itemValue:"add plots", isButton:true, btnIcon:CgAdd, onClickHanlder:()=>navigateToAddPlotsHandler()},
                            ]}
                        />
                    ))
                }
            </ScrollableContainer>
        </div>
    )
};

export default Sites;