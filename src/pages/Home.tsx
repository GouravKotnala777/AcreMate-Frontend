import "../styles/pages/home.scss";
import { useEffect, useRef, useState } from "react";
import { PlotTypes } from "../utils/types";
import { findPendingClients, sendMessageToClient } from "../api";
import { useNavigate } from "react-router-dom";
import ListItem from "../components/ListItem";
import { BsInfo } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import ListHeading from "../components/ListHeading";
import { ScrollableContainer, Skeleton } from "../shared/SharedComponents";
import DataFlowHandler from "../components/DataFlow";


const Home = () => {
    const [allPendingPlots, setAllPendingPlots] = useState<(
        PlotTypes&
        {pending:number; timeCovered:number;}&
        {clientDetailes:{serialNumber:string; name:string; guardian:string; mobile:string;}}&
        {lastSlip:{_id:string; amount:number; createdAt:Date;}}
    )[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<{success:boolean; message:string; jsonData:object}>({success:false, message:"", jsonData:{}});
    const [isError, setIsError] = useState<boolean>(false);
    const scrollBottomRef = useRef<HTMLDivElement|null>(null);
    const navigate = useNavigate();


    const findPendingClientsHandler = async() => {
        if ((typeof skip !== "number") || (skip < 0 )) return;
        const res = await findPendingClients(skip);
        if (res.success) {
            setAllPendingPlots((prev) => [...prev, ...res.jsonData]);
            setSkip((prev) => prev+1);
            setIsLoading(false);
            setIsError(false);
        }
        else{
            setError(res);
            setIsLoading(false);
            setIsError(true);
        }
    };

    const navigateToSinglePage = (plotID:string) => {
        navigate(`/single-plot?plotID=${plotID}`);
    };

    const sendMessageToClientHandler = (to:string, message:string) => {
        sendMessageToClient({to, message});
    }

    useEffect(() => {
        const observer = new IntersectionObserver((enteries) => {
            if (enteries[0].isIntersecting) {
                findPendingClientsHandler();
            }
        }, {threshold:1});
        
        const scrollBottom = scrollBottomRef.current;
        if (!scrollBottom) return;
        observer.observe(scrollBottom);

        return() => {
            if (scrollBottom) observer.unobserve(scrollBottom);
        }
    }, []);



    return(
        <div className="home_bg">
            <button onClick={() => findPendingClientsHandler()}>Fetch Pendings</button>

            <ScrollableContainer>

                {
                    allPendingPlots.length !== 0 &&
                        <ListHeading
                            headingRow={[
                                {itemValue:"Serial No.", itemWidth:"8%"},
                                {itemValue:"Name", itemWidth:"8%"},
                                {itemValue:"Guardian", itemWidth:"8%"},
                                {itemValue:"Plot No.", itemWidth:"8%"},
                                {itemValue:"Site", itemWidth:"8%"},
                                {itemValue:"Last Slip Date", itemWidth:"8%"},
                                {itemValue:"Last Slip Amount", itemWidth:"8%"},
                                {itemValue:"Mobile", itemWidth:"8%"},
                                {itemValue:"Time Covered", itemWidth:"8%"},
                                {itemValue:"Pending", itemWidth:"8%"},
                                {itemValue:"Info", itemWidth:"8%"},
                                {itemValue:"Call", itemWidth:"8%"}
                            ]}
                        />
                }

                <DataFlowHandler
                    isLoading={isLoading}
                    isError={isError}
                    dataArray={allPendingPlots}
                    
                    LoadingComponent={
                        <>
                            <Skeleton width="100%" height="25px" margin="10px 0" />
                            <Skeleton width="100%" height="25px" margin="10px 0" />
                            <Skeleton width="100%" height="25px" margin="10px 0" />
                            <Skeleton width="100%" height="25px" margin="10px 0" />
                        </>
                        
                    }
                    DataNotExistComponent={
                        <div className="empty_list_cont">
                            <h4 className="empty_list_heading">No Pendings</h4>
                            <p className="empty_list_para">Your pendings will be shown here</p>
                        </div>
                    }
                    DataExistComponent={
                        allPendingPlots.map((i, index) => (
                            <ListItem
                                key={`${i._id}-${index}`}
                                uniqeKey={i._id}
                                cellWidth={[
                                    "8%",
                                    "8%",
                                    "8%",
                                    "8%",
                                    "8%",
                                    "8%",
                                    "8%",
                                    "8%",
                                    "8%",
                                    "8%",
                                    "8%",
                                    "8%"
                                ]}
                                row={[
                                    {itemValue:i.clientDetailes.serialNumber},
                                    {itemValue:i.clientDetailes.name},
                                    {itemValue:i.clientDetailes.guardian},
                                    {itemValue:i.plotNo},
                                    {itemValue:i.site},
                                    {itemValue:i.lastSlip.createdAt, isDate:true},
                                    {itemValue:i.lastSlip.amount},
                                    {itemValue:i.clientDetailes.mobile},
                                    {itemValue:i.timeCovered},
                                    {itemValue:i.pending, style:{color:"red", fontWeight:"600"}},
                                    {itemValue:"info", isButton:true, btnIcon:BsInfo, onClickHanlder:()=>navigateToSinglePage(i._id.toString())},
                                    {itemValue:"call", isButton:true, btnIcon:IoCall, onClickHanlder:()=>sendMessageToClientHandler(i.clientDetailes.mobile, `Hello ${i.clientDetailes.name} your pending is ${i.pending}₹`)}
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

            {/*<pre>{JSON.stringify(allPendingPlots, null, `\t`)}</pre>*/}
            <div className="scroll_bottom" ref={scrollBottomRef}>load more...</div>
        </div>
    )
};

export default Home;