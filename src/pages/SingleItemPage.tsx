import { ChangeEvent, MouseEvent, UIEvent, useEffect, useRef, useState } from "react";
import { DialogBox, FormSharedComponent, Heading, KeyValuePairs, Timer } from "../shared/SharedComponents";
import "../styles/pages/single_item_page.scss";
import { detachClientFromPlot, findAllPlots, findSingleClientAllSlips, findSinglePlot, findSingleSite, resetSiteRows, updateSiteRows } from "../api";
import { PlotBeltTypes, PlotTypes, SiteTypes, SlipTypes, UpdateSiteBodyTypes } from "../utils/types";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BG_COLOR, PRIMARY_LIGHT } from "../utils/constants";
import { useSelectedRoute } from "../Context";
import { getMonthsCovered } from "../utils/utilFunctions";
import Table from "../shared/Table";
import { BsThreeDots } from "react-icons/bs";
import { BiDownArrow } from "react-icons/bi";

export const SingleUser = () => {

    return(
        <div className="single_plot_bg">

        </div>
    )
};
export const SingleAgent = () => {

    useEffect(() => {
        
    }, []);

    return(
        <div className="single_plot_bg">
            
        </div>
    )
};
export const SingleClient = () => {
    const [clientAllSlips, setClientAllSlips] = useState<SlipTypes[]>([]);
    const {clientID} = useParams();

    useEffect(() => {
        if (clientID) {
            findSingleClientAllSlips(clientID)
            .then((data) => {
                setClientAllSlips(data.jsonData)
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [clientID]);

    return(
        <div className="single_plot_bg">
            <Heading text="Client All Slips" textAlign="center" />
            <Table data={clientAllSlips} />
            {/*<pre>{JSON.stringify(clientAllSlips, null, `\t`)}</pre>*/}
        </div>
    )
};
//const dummyDat = {
//    shouldPay:9000,
//    payments:[
//        {
//            amount:10000,
//            pending:2000,
//            createdAt:"20-01-25"            
//        },
//        {
//            amount:7000,
//            pending:2000,
//            createdAt:"21-02-25"            
//        },
//        {
//            amount:100000,
//            pending:2000,
//            createdAt:"19-03-25"            
//        },
//        {
//            amount:10000,
//            pending:2000,
//            createdAt:"21-04-25"            
//        },
//        {
//            amount:8000,
//            pending:2000,
//            createdAt:"19-05-25"            
//        },
//        {
//            amount:9000,
//            pending:2000,
//            createdAt:"24-06-25"            
//        },
//        {
//            amount:10000,
//            pending:2000,
//            createdAt:"20-07-25"            
//        },
//        {
//            amount:11000,
//            pending:2000,
//            createdAt:"22-08-25"            
//        },
//        {
//            amount:9000,
//            pending:2000,
//            createdAt:"24-09-25"            
//        },
//        {
//            amount:10000,
//            pending:2000,
//            createdAt:"20-10-25"            
//        },
//        {
//            amount:11000,
//            pending:2000,
//            createdAt:"22-11-25"            
//        },
//        {
//            amount:8000,
//            pending:2000,
//            createdAt:"19-12-25"            
//        },
//        {
//            amount:7000,
//            pending:2000,
//            createdAt:"21-13-25"            
//        },
//        {
//            amount:8000,
//            pending:2000,
//            createdAt:"19-14-25"            
//        },
//        {
//            amount:9000,
//            pending:2000,
//            createdAt:"24-15-25"            
//        },
//        {
//            amount:10000,
//            pending:2000,
//            createdAt:"20-16-25"            
//        },
//        {
//            amount:11000,
//            pending:2000,
//            createdAt:"22-17-25"            
//        },
//        {
//            amount:7000,
//            pending:2000,
//            createdAt:"21-18-25"            
//        },
//        {
//            amount:8000,
//            pending:2000,
//            createdAt:"19-19-25"            
//        },
//        //{
//        //    amount:13000,
//        //    pending:2000,
//        //    createdAt:"24-20-25"            
//        //},
//        //{
//        //    amount:10000,
//        //    pending:2000,
//        //    createdAt:"20-21-25"            
//        //},
//        //{
//        //    amount:11000,
//        //    pending:2000,
//        //    createdAt:"22-22-25"            
//        //},
//        //{
//        //    amount:10000,
//        //    pending:2000,
//        //    createdAt:"24-23-25"            
//        //},
//        //{
//        //    amount:10000,
//        //    pending:2000,
//        //    createdAt:"22-17-25"            
//        //},
//        //{
//        //    amount:7000,
//        //    pending:2000,
//        //    createdAt:"21-18-25"            
//        //},
//        //{
//        //    amount:8000,
//        //    pending:2000,
//        //    createdAt:"19-19-25"            
//        //},
//        //{
//        //    amount:9000,
//        //    pending:2000,
//        //    createdAt:"24-20-25"            
//        //},
//        //{
//        //    amount:10000,
//        //    pending:2000,
//        //    createdAt:"20-21-25"            
//        //},
//        //{
//        //    amount:11000,
//        //    pending:2000,
//        //    createdAt:"22-22-25"            
//        //},
//        {
//            amount:100000,
//            pending:2000,
//            createdAt:"24-23-25"            
//        },
//        {
//            amount:10000,
//            pending:2000,
//            createdAt:"20-01-25"            
//        },
//        {
//            amount:7000,
//            pending:2000,
//            createdAt:"21-02-25"            
//        },
//        //{
//        //    amount:8000,
//        //    pending:2000,
//        //    createdAt:"19-03-25"            
//        //},
//        //{
//        //    amount:7000,
//        //    pending:2000,
//        //    createdAt:"21-04-25"            
//        //},
//        //{
//        //    amount:8000,
//        //    pending:2000,
//        //    createdAt:"19-05-25"            
//        //},
//        //{
//        //    amount:9000,
//        //    pending:2000,
//        //    createdAt:"24-06-25"            
//        //},
//        //{
//        //    amount:10000,
//        //    pending:2000,
//        //    createdAt:"20-07-25"            
//        //},
//        //{
//        //    amount:11000,
//        //    pending:2000,
//        //    createdAt:"22-08-25"            
//        //},
//        //{
//        //    amount:9000,
//        //    pending:2000,
//        //    createdAt:"24-09-25"            
//        //},
//        //{
//        //    amount:10000,
//        //    pending:2000,
//        //    createdAt:"20-10-25"            
//        //},
//        //{
//        //    amount:11000,
//        //    pending:2000,
//        //    createdAt:"22-11-25"            
//        //},
//        //{
//        //    amount:8000,
//        //    pending:2000,
//        //    createdAt:"19-12-25"            
//        //},
//        //{
//        //    amount:7000,
//        //    pending:2000,
//        //    createdAt:"21-13-25"            
//        //},
//        //{
//        //    amount:8000,
//        //    pending:2000,
//        //    createdAt:"19-14-25"            
//        //},
//        //{
//        //    amount:9000,
//        //    pending:2000,
//        //    createdAt:"24-15-25"            
//        //},
//        //{
//        //    amount:10000,
//        //    pending:2000,
//        //    createdAt:"20-16-25"            
//        //},
//        //{
//        //    amount:11000,
//        //    pending:2000,
//        //    createdAt:"22-17-25"            
//        //},
//        //{
//        //    amount:7000,
//        //    pending:2000,
//        //    createdAt:"21-18-25"            
//        //},
//        //{
//        //    amount:8000,
//        //    pending:2000,
//        //    createdAt:"19-19-25"            
//        //},
//        //{
//        //    amount:100000,
//        //    pending:2000,
//        //    createdAt:"24-20-25"            
//        //},
//        //{
//        //    amount:10000,
//        //    pending:2000,
//        //    createdAt:"20-21-25"            
//        //},
//        //{
//        //    amount:11000,
//        //    pending:2000,
//        //    createdAt:"22-22-25"            
//        //},
//        //{
//        //    amount:9000,
//        //    pending:2000,
//        //    createdAt:"24-23-25"            
//        //},
//        //{
//        //    amount:11000,
//        //    pending:2000,
//        //    createdAt:"22-17-25"            
//        //},
//        //{
//        //    amount:7000,
//        //    pending:2000,
//        //    createdAt:"21-18-25"            
//        //},
//        //{
//        //    amount:8000,
//        //    pending:2000,
//        //    createdAt:"19-19-25"            
//        //},
//        //{
//        //    amount:9000,
//        //    pending:2000,
//        //    createdAt:"24-20-25"            
//        //},
//        //{
//        //    amount:10000,
//        //    pending:2000,
//        //    createdAt:"20-21-25"            
//        //},
//        //{
//        //    amount:11000,
//        //    pending:2000,
//        //    createdAt:"22-22-25"            
//        //},
//        //{
//        //    amount:9000,
//        //    pending:2000,
//        //    createdAt:"24-23-25"            
//        //}
//    ]
//};
export const SinglePlot = () => {
    const [singlePlotData, setSinglePlotData] = useState<PlotTypes|null>(null);

    // we will take 'firstSlipData' & 'lastSlipData' from 'allSlipsData'
    const [firstSlipData, setFirstSlipData] = useState<SlipTypes|null>(null);
    const [lastSlipData, setLastSlipData] = useState<SlipTypes|null>(null);
    const [allSlipsData, setAllSlipsData] = useState<SlipTypes[]>([]);


    
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
    const [selectedSlipID, setSelectedSlipID] = useState<string>("");
    const [expendedSlipIDs, setExpendedSlipIDs] = useState<string[]>([]);


    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    const [nodeValue, setNodeValue] = useState<{lowest:number; highest:number;}>({lowest:0, highest:0});
    const [yRange, setYRange] = useState<number[]>([]);
    const [tooltipCollection, setTooltipCollection] = useState<{x:number; y:number; amount:number; date:Date;}[]>([]);
    const [tooltip, setTooltip] = useState<{x:number; y:number; amount:number}>({x:0, y:0, amount:0});
    const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
    const [hoveringDotAmount, setHoveringDotAmount] = useState<number>(0);
    const [scrollLeft, setScrollLeft] = useState<number>(0);
    const [clientWidth, setClientWidth] = useState<number>(0);
    const [hoveringDotDate, setHoveringDotDate] = useState<Date|null>(null);
    const [isTooltipAtEnd, setIsTooltipAtEnd] = useState<boolean>(false);
    



    const [query] = useSearchParams();
    const navigate = useNavigate();
    const {setSelectedRoute, setSelectedPanel} = useSelectedRoute();


    const plotID = query.get("plotID");
    const clientID = query.get("clientID");
    const slipID = query.get("slipID");
    //const siteID = query.get("siteID");
    //const agentID = query.get("agentID");

    const payEMIHandler = () => {

        if (singlePlotData?.plotStatus === "vacant") {
            navigate(`/create?plotID=${singlePlotData._id}&plotStatus=${singlePlotData?.plotStatus}&formPanelFor=slips`);
            setSelectedRoute("slips");
            setSelectedPanel("create");
        }
        else{
            navigate(`/create?plotID=${singlePlotData?._id}&plotStatus=${singlePlotData?.plotStatus}&formPanelFor=slips`);
            setSelectedRoute("slips");
            setSelectedPanel("create");
        }
    };
    const resetPlotAssignmentHandler = async() => {
        if (!plotID) {
            throw new Error("PlotID not found");
        }
        await detachClientFromPlot({plotID});
    }
    const func = (expendedSlipI:string) => {
        if (expendedSlipIDs.includes(expendedSlipI)) {
            console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
            setExpendedSlipIDs((prev) => prev.filter((s) => s !== expendedSlipI))

            const expendedSlip = document.getElementById(expendedSlipI);
            if (!expendedSlip) return null;
            expendedSlip.style.gridTemplateRows = "2px";
            expendedSlip.style.fontSize = "0px";
        }
        else{
            console.log("NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN");
            setExpendedSlipIDs((prev) => [...prev, expendedSlipI]);
            
            const expendedSlip = document.getElementById(expendedSlipI);
            if (!expendedSlip) return null;
            expendedSlip.style.gridTemplateRows = "100px";
            expendedSlip.style.fontSize = "0.8rem";

        }
    };



    const getHighestAmount = () => {
        let lowestNum = 0;
        let highestNum = 0;
        const y_range:number[] = [];
        let y_interval = 0;
        for(const payment of allSlipsData){
            if (payment.amount > highestNum) {
                highestNum = payment.amount;
            }
            if (payment.amount < lowestNum) {
                lowestNum = payment.amount;
            }
            if (lowestNum === 0) {
                lowestNum = payment.amount;
            }
        }
        

        setNodeValue({lowest:lowestNum, highest:highestNum});
        
        y_interval = Math.ceil((highestNum-lowestNum)/(allSlipsData.length*2));
        setYRange([]);
        for(let i=0; i<=allSlipsData.length*2; i++){
            y_range.push(lowestNum+(y_interval*(i)));
            setYRange((prev) => [...prev, lowestNum+(y_interval*(i))]);
        }     
    };

    const convertMoneyToPx = (amount:number|undefined, xAxisMarginTop:number) => {
        if (!amount) return NaN;
        const valueInPx = ((amount-nodeValue.lowest)/1)/((nodeValue.highest-nodeValue.lowest)/xAxisMarginTop);

        if (!isFinite(valueInPx)) return NaN;
        return Math.ceil(valueInPx);
    };

    const tooltipHandler = (e:MouseEvent<HTMLCanvasElement>) => {       
        setTooltip({x:e.clientX-10+scrollLeft, y:e.clientY-157, amount:0});        
    };
    const aHandler = (e:UIEvent<HTMLDivElement>) => {
        setScrollLeft(e.currentTarget.scrollLeft);
        setClientWidth(e.currentTarget.clientWidth);
    };

    useEffect(() => {
        const hoveringDot = tooltipCollection.find((tltp) => 
            tooltip.x > tltp.x-3 &&
            tooltip.x <= tltp.x+3
        );
        if (hoveringDot) {
            setIsTooltipVisible(true);
            if(hoveringDot.x > clientWidth+scrollLeft-100){
                setIsTooltipAtEnd(true);
            }
            else{
                setIsTooltipAtEnd(false)
            }
            setHoveringDotAmount(hoveringDot.amount);
            setHoveringDotDate(hoveringDot.date);
        }
        else{
            setHoveringDotAmount(0);
            setHoveringDotDate(null);
            setIsTooltipVisible(false);
        }
    }, [tooltip]);

    useEffect(() => {
        if (!singlePlotData?.shouldPay) return;
        
        // Canvas variables
        const canvas = canvasRef.current;
        const canvasWidth = 1200;
        const canvasHeight = 300;
        // Y-axis variables
        const yAxisMarginLeft = 50;
        const yAxisMarginTop = 0;
        const yAxisMarginBottom = 300;

        if (!canvas) return;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        const ctx = canvas.getContext("2d");
        
        if (!ctx) return;

        // Y-axis line
        ctx.beginPath();
        ctx.moveTo(yAxisMarginLeft, yAxisMarginTop);
        ctx.lineTo(yAxisMarginLeft, yAxisMarginBottom);
        ctx.stroke();

        // EMI line
        ctx.beginPath();
        ctx.moveTo(yAxisMarginLeft, 280-convertMoneyToPx(singlePlotData?.shouldPay, 280)+10);
        ctx.lineTo(canvasWidth, 280-convertMoneyToPx(singlePlotData?.shouldPay, 280)+10);
        ctx.setLineDash([2, 2]);
        ctx.strokeStyle = "#919191";
        ctx.stroke();

        ctx.setLineDash([]);

        // Y-axis dash
        for(let i=0; i<=allSlipsData.length*2; i++){
            ctx.beginPath();
            ctx.moveTo(45, convertMoneyToPx(yRange[i], 280)+10);
            ctx.lineTo(55, convertMoneyToPx(yRange[i], 280)+10);
            ctx.stroke();
        }
        // Y-axis lables
        for(let i=0; i<=allSlipsData.length*2; i++){
            ctx.font = "8px arial";
            ctx.fillText((yRange[(allSlipsData.length*2) - i]??0).toString(), 10, convertMoneyToPx(yRange[i], 280)+13);
        }
        // Dots
        setTooltipCollection([]);
        for(let i=0; i<allSlipsData.length; i++){
            ctx.beginPath();
            if (allSlipsData[i].amount >= singlePlotData?.shouldPay) {
                ctx.strokeStyle = "#00a700";
                ctx.fillStyle = "#93ff93";
                
            } else {
                ctx.strokeStyle = "#a70000";
                ctx.fillStyle = "#ff9393";
            }
            if (tooltip.x > (i*(canvasWidth/allSlipsData.length-5))+50+50-3 && tooltip.x <= (i*(canvasWidth/allSlipsData.length-5))+50+50+3) {
                ctx.arc((i*(canvasWidth/allSlipsData.length-5))+50+50, 280-convertMoneyToPx(allSlipsData[i].amount, 280)+10, 5, 0, 2.5*Math.PI);
            }
            else{
                ctx.arc((i*(canvasWidth/allSlipsData.length-5))+50+50, 280-convertMoneyToPx(allSlipsData[i].amount, 280)+10, 2.5, 0, 2.5*Math.PI);
            }
            ctx.fill();
            ctx.stroke();

            //console.log(allSlipsData[i].amount);
            
            if (convertMoneyToPx(allSlipsData[i].amount, 280)) {
                setTooltipCollection((prev) => [...prev, {x:(i*(canvasWidth/allSlipsData.length-5))+50+50, y:(280-convertMoneyToPx(allSlipsData[i].amount, 280))+10, amount:allSlipsData[i].amount, date:allSlipsData[i].createdAt}]);
            }
            else if (!isNaN(convertMoneyToPx(allSlipsData[i].amount, 280))) {
                setTooltipCollection((prev) => [...prev, {x:(i*(canvasWidth/allSlipsData.length-5))+50+50, y:(280-convertMoneyToPx(allSlipsData[i].amount, 280))+10, amount:allSlipsData[i].amount, date:allSlipsData[i].createdAt}]);
            }
            else{
                console.log("NNNNNNNNNNNNNNNNNNNNN");
            }
        }
        // Lines
        for(let i=0; i<allSlipsData.length; i++){
            ctx.beginPath();
            if (allSlipsData[i].amount >= singlePlotData?.shouldPay) {
                ctx.strokeStyle = "#51ff51";
            
            } else {
                ctx.strokeStyle = "#ff5151";
            }
            ctx.moveTo((i*(canvasWidth/allSlipsData.length-5))+50+50, 280-convertMoneyToPx(allSlipsData[i].amount, 280)+10);
            if (i+1 < allSlipsData.length) {
                ctx.lineTo(((i+1)*(canvasWidth/allSlipsData.length-5))+50+50, 280-convertMoneyToPx(allSlipsData[i+1].amount, 280)+10);
            }
            ctx.stroke();
        }
        // Hovering dotted line
        ctx.beginPath();
        ctx.strokeStyle = "#919191";
        ctx.setLineDash([2, 2]);
        ctx.moveTo(tooltip.x, 0);
        ctx.lineTo(tooltip.x, 300);
        ctx.stroke();
    }, [allSlipsData, tooltip]);


    const gg = () => {
        console.log(yRange);
        console.log(nodeValue);        
        console.log(allSlipsData);
        console.log(tooltipCollection);
    }
    

    useEffect(() => {
        getHighestAmount();
    }, [allSlipsData]);



    
    useEffect(() => {        
        if (!plotID || plotID === "null" || plotID === "undefined") {
            //alert("plotID not found");
            return;
        }
        findSinglePlot({plotID})
        .then((data) => {
            setSinglePlotData(data.jsonData.singlePlot);
            setFirstSlipData(data.jsonData.firstSlip);
            setLastSlipData(data.jsonData.lastSlip);
            setAllSlipsData(data.jsonData.allSlips);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [plotID]);
    useEffect(() => {
        if (!clientID || clientID === "null" || clientID === "undefined") {
//alert("clientID not found");
            return;
        }
        findSinglePlot({clientID})
        .then((data) => {
            setSinglePlotData(data.jsonData.singlePlot);
            setFirstSlipData(data.jsonData.firstSlip);
            setLastSlipData(data.jsonData.lastSlip);
            setAllSlipsData(data.jsonData.allSlips);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [clientID]);
    useEffect(() => {
        if (!slipID || slipID === "null" || slipID === "undefined") {
//alert("clientID not found");
            return;
        }
        findSinglePlot({slipID})
        .then((data) => {
            setSinglePlotData(data.jsonData.singlePlot);
            setFirstSlipData(data.jsonData.firstSlip);
            setLastSlipData(data.jsonData.lastSlip);
            setAllSlipsData(data.jsonData.allSlips);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [slipID]);

    return(
        <>
        <DialogBox isOpen={isEditDialogOpen} setIsOpen={setIsEditDialogOpen} updateItemID={selectedSlipID} setAllSlipsData={setAllSlipsData} />
        <div className="single_plot_bg">
            {/*<Heading text={`Plot No. ${plotID}`} />*/}
            {/*<button onClick={assignPlotHandler}>Assign plot</button>*/}
            {/*<pre>{JSON.stringify(nodeValue, null, `\t`)}</pre>*/}
            <button onClick={resetPlotAssignmentHandler}>Reset Plot Assignment</button>
            <button onClick={payEMIHandler}>{singlePlotData?.plotStatus === "vacant"?"Sell To Client":"Pay EMI"}</button>

            <button onClick={gg}>EMIs</button>

            <div className="canvas_scrollable" onScroll={(e) => aHandler(e)}>
                <canvas ref={canvasRef} className="emi_chart" onMouseMove={(e) => tooltipHandler(e)}>
                </canvas>
            </div>

            {
                isTooltipVisible && hoveringDotDate &&
                    <div className="tooltip_dialog"
                        style={{
                            top:`${tooltip.y+70}px`,
                            left:(isTooltipAtEnd) ? `${tooltip.x-150-scrollLeft}px` : `${tooltip.x-scrollLeft}px`
                        }}
                    >
                        <KeyValuePairs
                            keyValuePairArray={[
                                {"Date":new Date(hoveringDotDate)?.toLocaleDateString(undefined, {day:"2-digit", month:"short", year:"2-digit"})},
                                {"Amount":hoveringDotAmount}
                            ]}
                        />
                    </div>
            }




            <div className="plot_info_cont">
                <KeyValuePairs keyValuePairArray={[
                    {"Plot No.":singlePlotData?.plotNo},
                    {"Plot Size":`${singlePlotData?.size}sqyd`},
                    {"Plot Rate":`₹${singlePlotData?.rate}/-`},
                    {"Dimensions":`${singlePlotData?.breath}X${singlePlotData?.length}`}
                ]} isLoading={!singlePlotData} />
                <KeyValuePairs keyValuePairArray={[
                    {"Agent":singlePlotData?.agentID},
                    {"Client":singlePlotData?.clientID}
                ]} isLoading={!singlePlotData} />
                <KeyValuePairs keyValuePairArray={[
                    {"Duration":`${singlePlotData?.duration}months`},
                    {"Time Convered":getMonthsCovered(firstSlipData?.createdAt)},
                    {"Should Pay":`₹${singlePlotData?.shouldPay}/-`},
                    {"Paid":`₹${singlePlotData?.paid}/-`},
                    {"Status":singlePlotData?.plotStatus}
                ]} isLoading={!singlePlotData} />

                {
                    firstSlipData &&
                        <KeyValuePairs keyValuePairArray={[
                            {"First Payment Date":new Date(firstSlipData?.createdAt||"27-02-2025")?.toLocaleString(undefined, {day:"numeric", month:"short", year:"numeric"})},
                            {"First Payment Amount":`₹${firstSlipData?.amount}/-`},
                            {"Last Payment Date":new Date(lastSlipData?.createdAt||"27-02-2025")?.toLocaleString(undefined, {day:"numeric", month:"short", year:"numeric"})},
                            {"Last Payment Amount":`₹${lastSlipData?.amount}/-`}
                        ]} isLoading={!firstSlipData} />
                }
                

                {
                    (singlePlotData?.shouldPay&&singlePlotData?.paid)&&
                        <KeyValuePairs
                            keyValuePairArray={[
                                {[-(singlePlotData.shouldPay - singlePlotData.paid)<=0?"Pending":"Extra"]:`${-(singlePlotData.shouldPay - singlePlotData.paid)}/-`}
                            ]}
                            color={singlePlotData.shouldPay - singlePlotData.paid>0?"red":"#00cc00"}
                        />
                }

                {
                    singlePlotData &&
                        <KeyValuePairs
                            keyValuePairArray={[
                                {"Total Slips":allSlipsData.length},
                                {"Slips (cleared)":allSlipsData.reduce((acc, iter) => iter.isCancelled === false?acc+1:acc, 0)},
                                {"Slips (cancelled)":allSlipsData.reduce((acc, iter) => iter.isCancelled === true?acc+1:acc, 0)},
                                {"Total EMIs cleared":Number(singlePlotData?.paid/singlePlotData?.shouldPay).toFixed(2)}
                            ]}
                        />
                }

                <Timer bgColor={BG_COLOR} monthsCovered={getMonthsCovered(firstSlipData?.createdAt)} duration={singlePlotData?.duration} />
            </div>
            <div className="slips_cont">
                <div className="slip_cont" style={{
                    backgroundColor:PRIMARY_LIGHT
                }}>
                    <div className="upper_part">
                        <div className="date slip_content">Date</div>
                        <div className="slip_type slip_content">Slip Type</div>
                        <div className="slip_number slip_content">Slip No.</div>
                        <div className="client_name slip_content">Client Name</div>
                        <div className="amount slip_content">Amount</div>
                        <div className="mode slip_content">Mode Of Payment</div>
                        <div className="mode slip_content">PaymentID</div>
                        {/*<div className="mode slip_content">Status</div>*/}
                        <div className="edit_btn slip_content">edit</div>
                        {/*<div className="mode slip_content">Cancelled For</div>*/}
                        {/*<div className="mode slip_content">Remark</div>*/}
                    </div>
                </div>
                
                {
                    allSlipsData.map((slp) => (
                        <div className="slip_cont" key={slp._id} style={{
                            backgroundColor:slp.isCancelled ?
                                "#ff000050"
                                :
                                "white"
                        }}>
                            <div className="upper_part">
                                <div className="date slip_content">{new Date(slp.createdAt).toLocaleDateString(undefined, {day:"2-digit", month:"2-digit", year:"numeric"})}</div>
                                <div className="slip_type slip_content">
                                    {slp.slipType}
                                </div>
                                <div className="slip_number slip_content">{slp.slipNo}</div>
                                <div className="client_name slip_content">{slp.clientID}</div>
                                <div className="amount slip_content">₹{slp.amount}/-</div>
                                {/*<div className="admin slip_content"></div>*/}
                                <div className="mode slip_content">{slp.modeOfPayment}</div>
                                <div className="mode slip_content">{slp.paymentID}</div>
                                {/*<div className="is_cancelled slip_content">{slp.isCancelled.toString()}</div>*/}
                                <button className="edit_btn slip_content" onClick={() => {setIsEditDialogOpen(!isEditDialogOpen); setSelectedSlipID(slp._id);}}><BsThreeDots /></button>

                                {
                                    slp.isCancelled &&
                                        <button className="edit_btn slip_content" onClick={() => {func(`slip_${slp._id}`);}}><BiDownArrow /></button>
                                }
                            </div>
                            <div id={`slip_${slp._id}`} className="lower_part">
                                <p>{slp.cancelledFor}</p>
                                <p>{slp.remark}</p>
                            </div>

                            {/*<select className="is_cancelled slip_content selectable" defaultValue={slp.isCancelled.toString()}>
                                <option value="downpay">true</option>
                                <option value="token">false</option>
                            </select>*/}
                            {/*<div className="cancelled_for slip_content">{slp.cancelledFor?slp.cancelledFor:"------"}</div>*/}
                            {/*<div className="remark slip_content">{slp.remark?slp.remark:"------"}</div>*/}
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    )
};
export const SingleSlip = () => {

    return(
        <div className="single_plot_bg">

        </div>
    )
};
export const SingleSite = () => {
    const [query] = useSearchParams();
    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    const [data, setData] = useState<PlotTypes[]>([]);
    const [siteData, setSiteData] = useState<SiteTypes|null>(null);
    const [updateRowFormData, setUpdateRowFormData] = useState<UpdateSiteBodyTypes>({siteID:""});
    const [isSiteUpdateFormActive, setIsSiteUpdateFormActive] = useState<boolean>(false);
    
    const siteID = query.get("siteID");

    const findAllPlotsHandler = async() => {
        const res = await findAllPlots();
        setData(res.jsonData);
    };
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setUpdateRowFormData({...updateRowFormData, [e.target.name]:e.target.value});
    };
    const updateSiteRowHandler = async() => {
        const res = await updateSiteRows({...updateRowFormData});
        setSiteData(res.jsonData);
    };
    const resetSiteRowHandler = async() => {
        if (!siteID) {
            return
        }
        const res = await resetSiteRows({siteID});
        setSiteData(res.jsonData);
    };

    useEffect(() => {
        const boxH = 30;
        const boxY = 10;
        
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        
        canvas.width = window.innerWidth;
        canvas.height = 300;
        
        const ctx = canvas.getContext("2d");
        
        if (!ctx) return;
        

        if (!siteData || siteData?.plotsInSingleRow.length === 0) {
            alert("siteData.plotsInSingleRow is empty");
            throw new Error("siteData.plotsInSingleRow is empty or null");
        }

        for(const objIndex in (siteData?.plotsInSingleRow as PlotBeltTypes[])){
            let rowWidth:number = 0;
            let soldArea:number = 0;
            let finalWidth = 0;
            for(let i=(Number(siteData.plotsInSingleRow[Number(objIndex)].lastPlotNo)-Number(siteData.plotsInSingleRow[Number(objIndex)].noOfPlots)); i<siteData.plotsInSingleRow[Number(objIndex)].lastPlotNo; i++){
                const w = data[i].size;
                finalWidth = rowWidth+data[Number(i)].size-w;

                if (data[Number(i)].hasSold) {
                    soldArea += data[i].size;
                }
                //if (data[Number(i)].plotStatus === "completed" || data[Number(i)].plotStatus === "pending" || data[Number(i)].plotStatus === "registered") {
                //    soldArea += data[i].size;
                //}
                if (data[Number(i)].plotStatus === "vacant") {
                    ctx.fillStyle = "#ffa0a0";
                }
                else if (data[Number(i)].plotStatus === "registered" || data[Number(objIndex)].plotStatus === "completed") {
                    ctx.fillStyle = "#23a949";
                }
                else{
                    ctx.fillStyle = "#60ff60";
                }

                rowWidth += w;
                
                ctx.fillRect(finalWidth, (Number(objIndex)*boxY)+(Number(objIndex)*boxH), w, boxH);


                ctx.strokeStyle = "black";
                ctx.strokeRect(finalWidth, (Number(objIndex)*boxY)+(Number(objIndex)*boxH), w, boxH);
                

                ctx.fillStyle = "black";
                ctx.font = "12px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(`${data[i].plotNo}`, finalWidth+w/2, (boxH/2)+(Number(objIndex)*boxY)+(Number(objIndex)*boxH)-5);
                ctx.fillText(`${data[i].size}`, finalWidth+w/2, (boxH/2)+(Number(objIndex)*boxY)+(Number(objIndex)*boxH)+10);
            }
            ctx.fillText(`=> ${soldArea}sqyd / ${rowWidth}sqyd`, rowWidth+data[data.length-1].size, (Number(objIndex)*boxY)+(Number(objIndex)*boxH)+15);
        }

    }, [siteData, data]);

    useEffect(() => {
        if (!siteID) {
            return
        }
        findSingleSite(siteID)
        .then((data) => {
            setSiteData(data.jsonData);
        })
        .catch((err) => {
            console.log(err);
        });
        findAllPlotsHandler();
    }, [siteID]);

    return(
        <>
            <button onClick={resetSiteRowHandler}>Reset site belt</button>
            <button onClick={() => setIsSiteUpdateFormActive(true)}>Update site belt</button>
            {
                isSiteUpdateFormActive &&
                    <FormSharedComponent
                        inputArray={[
                            {type:"text", label:"No. of plots in this Belt", name:"noOfPlots"},
                            {type:"text", label:"Last plot number in this belt", name:"lastPlotNo"},
                            {type:"text", label:"Plot base size", name:"baseSize"}
                        ]}
                        btnText="Update Plot Belt"
                        onChangeFeildsHandler={onChangeHandler}
                        onSubmitFormHandler={updateSiteRowHandler}
                    />
            }

            {
                data.length !== 0 ?
                    <canvas ref={canvasRef}
                        style={{
                            border:"2px solid red",
                            width:"100%",
                            height:"300px"
                        }}
                    >
                    </canvas>
                    :
                    <h1>Your Site will show here</h1>

            }

            <div className="belts_cont">
                <div className="belt" style={{backgroundColor:PRIMARY_LIGHT}}>
                    <div className="plot_quantity">Belt Number</div>
                    <div className="plot_quantity">Number Of Plots</div>
                    <div className="last_plot">Last Plot Number</div>
                    <div className="base_size">Base Size</div>
                </div>
                {
                    siteData?.plotsInSingleRow.map((belt, index) => (
                        <div className="belt" key={index}>
                            <div className="plot_quantity">{`(${index+1})`}</div>
                            <div className="plot_quantity">{belt.noOfPlots}</div>
                            <div className="last_plot">{belt.lastPlotNo}</div>
                            <div className="base_size">{belt.baseSize}</div>
                        </div>
                    ))
                }
            </div>
        </>
    )
};

