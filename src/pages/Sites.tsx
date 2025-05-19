import { useEffect, useState } from "react";
import { findAllSites } from "../api";
import { SiteTypes } from "../utils/types";
import { useNavigate } from "react-router-dom";
import "../styles/pages/sites.scss";
import ListHeading from "../components/ListHeading";
import ListItem from "../components/ListItem";
import { BsInfoSquare } from "react-icons/bs";
import { ButtonPrimary, HeadingParaCont, ScrollableContainer, Skeleton } from "../shared/SharedComponents";
import DataFlowHandler from "../components/DataFlow";
import { BiAddToQueue } from "react-icons/bi";


const Sites = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<{success:boolean; message:string; jsonData:object}>({success:false, message:"", jsonData:{}});
    const [isError, setIsError] = useState<boolean>(false);
    const [allSites, setAllSites] = useState<SiteTypes[]>([]);
    const navigate = useNavigate();

    const navigateToSinglePageHandler = (siteID:string) => {
        navigate(`/single-site?siteID=${siteID}`)
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        findAllSites(signal)
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
            if (err.name === "AbortError") {
                console.log(err, 1);
                //setIsError(false);
            }
            else{
                console.log(err, 2);
                setError(err);
                setIsError(true);
            }
            console.log(err, 3);
            setIsLoading(false);
        });

        return () => {
            controller.abort();
        }
    }, []);

    return(
        <div className="sites_bg">
            <ButtonPrimary
                text="Create Site"
                Icon={BiAddToQueue}
                onClickHandler={() => navigate("/create?formPanelFor=sites")}
            />
            <ScrollableContainer>
                {
                    allSites.length !== 0 &&
                        <ListHeading
                            headingRow={[
                                {itemValue:"ID", itemWidth:"16%"},
                                {itemValue:"Site Name", itemWidth:"16%"},
                                {itemValue:"Total Size", itemWidth:"16%"},
                                {itemValue:"Sold Area", itemWidth:"16%"},
                                {itemValue:"Info", itemWidth:"16%"}
                            ]}
                        />
                }

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
                        <HeadingParaCont
                            heading="No Sites"
                            para="Your sites will be shown here"
                        />
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
                                    "16%"
                                ]}
                                row={[
                                    {itemValue:st._id},
                                    {itemValue:st.siteName},
                                    {itemValue:st.totalSize},
                                    {itemValue:st.soldArea},
                                    {itemValue:"info", isButton:true, btnIcon:BsInfoSquare, onClickHanlder:()=>navigateToSinglePageHandler(st._id)}
                                ]}
                            />
                        ))
                    }
                    ErrorComponent={
                        <HeadingParaCont
                            heading="Something went wrong"
                            para={error.message}
                        />
                    }
                />
            </ScrollableContainer>
        </div>
    )
};

export default Sites;