import { useEffect, useState } from "react";
import { findAllSites } from "../api";
import { SiteTypes } from "../utils/types";
import { useNavigate } from "react-router-dom";
import "../styles/pages/sites.scss";
import ListHeading from "../components/ListHeading";
import ListItem from "../components/ListItem";
import { BsInfo } from "react-icons/bs";
import { CgAdd } from "react-icons/cg";
import { ScrollableContainer, Skeleton } from "../shared/SharedComponents";
import DataFlowHandler from "../components/DataFlow";


const Sites = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<{success:boolean; message:string; jsonData:object}>({success:false, message:"", jsonData:{}});
    const [isError, setIsError] = useState<boolean>(false);
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
            if (data.success) {
                setAllSites(data.jsonData);
                setIsLoading(false);
                setIsError(false);
            }
            else{
                setError(data);
                setIsLoading(false);
                setIsError(true);
            }
        })
        .catch((err) => {
            console.log(err);
            setError(err);
            setIsLoading(false);
            setIsError(true);
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

                <DataFlowHandler
                    isLoading={isLoading}
                    isError={isError}
                    dataArray={allSites}
                    
                    LoadingComponent={
                        <>
                            <Skeleton width="100%" height="25px" margin="10px 0" />
                            <Skeleton width="100%" height="25px" margin="10px 0" />
                            <Skeleton width="100%" height="25px" margin="10px 0" />
                            <Skeleton width="100%" height="25px" margin="10px 0" />
                            <Skeleton width="100%" height="25px" margin="10px 0" />
                            <Skeleton width="100%" height="25px" margin="10px 0" />
                        </>
                        
                    }
                    DataNotExistComponent={
                        <div className="empty_list_cont">
                            <h4 className="empty_list_heading">No Sites</h4>
                            <p className="empty_list_para">Your sites will be shown here</p>
                        </div>
                    }
                    DataExistComponent={
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
                    ErrorComponent={
                        <div className="empty_list_cont">
                            <h4 className="empty_list_heading">Something went wrong</h4>
                            <p className="empty_list_para">{error.message}</p>
                        </div>
                    }
                />
            </ScrollableContainer>
        </div>
    )
};

export default Sites;