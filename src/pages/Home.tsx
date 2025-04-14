import "../styles/pages/home.scss";
import { useEffect, useRef, useState } from "react";
import { PlotTypes } from "../utils/types";
import { findPendingClients } from "../api";
import { useNavigate } from "react-router-dom";
import List from "../shared/List";



const Home = () => {
    const [allPendingPlots, setAllPendingPlots] = useState<(
        PlotTypes&
        {pending:number; timeCovered:number;}&
        {clientDetailes:{serialNumber:string; name:string; guardian:string; mobile:string;}}&
        {lastSlip:{_id:string; amount:number; createdAt:Date;}}
    )[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const scrollBottomRef = useRef<HTMLDivElement|null>(null);
    const navigate = useNavigate();


    const findPendingClientsHandler = async() => {
        if ((typeof skip !== "number") || (skip < 0 )) return;
        const res = await findPendingClients(skip);
        if (res.success) {
            setAllPendingPlots((prev) => [...prev, ...res.jsonData]);
            setSkip((prev) => prev+1);
        }
    };

    const navigateToSinglePage = (plotID:string) => {
        navigate(`/single-plot?plotID=${plotID}`);
    };

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
            <h1>Home</h1>
            <button onClick={() => findPendingClientsHandler()}>Fetch Pendings</button>

            {/*<pre>{JSON.stringify(allPendingPlots, null, `\t`)}</pre>*/}
            <List headings={[
                    {columnWidth:"8%", fieldHeading:"Serial No.", fieldName:"serialNumber"},
                    {columnWidth:"8%", fieldHeading:"Name", fieldName:"name"},
                    {columnWidth:"8%", fieldHeading:"Guardian", fieldName:"guardian"},
                    {columnWidth:"8%", fieldHeading:"Plot No.", fieldName:"plotNo"},
                    {columnWidth:"8%", fieldHeading:"Site", fieldName:"site"},
                    {columnWidth:"8%", fieldHeading:"Last Slip Date", fieldName:"createdAt", isDate:true},
                    {columnWidth:"8%", fieldHeading:"Last Slip Amount", fieldName:"amount"},
                    {columnWidth:"8%", fieldHeading:"Mobile", fieldName:"mobile"},
                    {columnWidth:"8%", fieldHeading:"Time Covered", fieldName:"timeCovered"},
                    {columnWidth:"8%", fieldHeading:"Pending", fieldName:"pending", style:{
                        color:"red",
                        fontWeight:"600"
                    }},
                    {columnWidth:"10%", fieldHeading:"Info", fieldName:"info", isButton:true, infoNavigationHandler:navigateToSinglePage},
                    {columnWidth:"10%", fieldHeading:"Call", fieldName:"send", isButton:true, onClickButton(){console.log("bbbbb")}}
                ]} data={allPendingPlots} hasRemark={true} />

            <div className="scroll_bottom" ref={scrollBottomRef}>load more...</div>
        </div>
    )
};

export default Home;