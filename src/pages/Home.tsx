import "../styles/pages/home.scss";
import { useEffect, useRef, useState } from "react";
import { PlotTypes } from "../utils/types";
import { findPendingClients, sendMessageToClient } from "../api";
import { useNavigate } from "react-router-dom";
import ListItem from "../components/ListItem";
import { BsInfoSquare } from "react-icons/bs";
import ListHeading from "../components/ListHeading";
import { ButtonPrimary, HeadingParaCont, ScrollableContainer, Skeleton } from "../shared/SharedComponents";
import DataFlowHandler from "../components/DataFlow";
import { TbArrowDownDashed } from "react-icons/tb";
import { BiMessageDetail } from "react-icons/bi";
import toast from "react-hot-toast";


const Home = () => {
    const [allPendingPlots, setAllPendingPlots] = useState<(
        PlotTypes&
        {pending:number; timeCovered:number;}&
        {clientDetailes:{serialNumber:string; name:string; guardian:string; mobile:string;}}&
        {lastSlip:{_id:string; amount:number; createdAt:Date;}}
    )[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const [isScreenLoading, setIsScreenLoading] = useState<boolean>(true);
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
    const [isDisable, setIsDisable] = useState<boolean>(false);
    const [error, setError] = useState<{success:boolean; message:string; jsonData:object}>({success:false, message:"", jsonData:{}});
    const [isError, setIsError] = useState<boolean>(false);
    const scrollBottomRef = useRef<HTMLDivElement|null>(null);
    const navigate = useNavigate();


    const findPendingClientsHandler = async() => {
        if ((typeof skip !== "number") || (skip < 0 )) return;
        setIsButtonLoading(true);
        const res = await findPendingClients(skip);
        if (res.success){
            if (res.jsonData.length !== 0){
                setAllPendingPlots((prev) => [...prev, ...res.jsonData]);
                setSkip((prev) => prev+1);
                setIsError(false);
                setIsDisable(false);
                //setIsScreenLoading(false);
            }
            else{
                setIsError(false);
                //setIsScreenLoading(false);
                
                setIsDisable(true);
            }
        }
        else{
            setError(res);
            setIsError(true);
        }
        setIsScreenLoading(false);
        setIsButtonLoading(false);
    };

    const navigateToSinglePage = (plotID:string) => {
        navigate(`/single-plot?plotID=${plotID}`);
    };

    const sendMessageToClientHandler = async(to:string, message:string) => {
        if (!to || !message) {
            toast.error("All fields are required", {
                duration:2500,
                position:"top-center"
            });
            return;
        }
        const data = await sendMessageToClient({to, message});

        if (data.success) {
            toast.success(data.message, {
                duration:2000,
                position:"top-center"
            });
        }
        else{
            toast.error(data.message, {
                duration:2000,
                position:"top-center"
            });
        }
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
            <ScrollableContainer tableStickyColumn={allPendingPlots.map((plt) => plt.clientDetailes.name)}>

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
                    isLoading={isScreenLoading}
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
                        <HeadingParaCont
                            heading="No Pendings"
                            para="Your pendings will be shown here"
                        />
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
                                    {itemValue:"info", isButton:true, btnIcon:BsInfoSquare, onClickHanlder:()=>navigateToSinglePage(i._id.toString())},
                                    {itemValue:"call", isButton:true, btnIcon:BiMessageDetail, onClickHanlder:()=>sendMessageToClientHandler(i.clientDetailes.mobile, `Hello ${i.clientDetailes.name} your pending is ${i.pending}₹`)}
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

            <ButtonPrimary
                text="load more"
                Icon={TbArrowDownDashed}
                onClickHandler={findPendingClientsHandler}
                margin="10px auto"
                isLoading={isButtonLoading}
                isDisable={isDisable}
            />
            <div className="scroll_bottom" ref={scrollBottomRef}>load more...</div>
        </div>
    )
};

export default Home;