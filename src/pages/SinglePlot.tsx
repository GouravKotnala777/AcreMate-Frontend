import { MouseEvent, UIEvent, useEffect, useRef, useState } from "react";
import { ButtonPrimary, DialogBox, KeyValuePairs, ScrollableContainer, Timer } from "../shared/SharedComponents";
import "../styles/pages/single_item_page.scss";
import { detachClientFromPlot, findSinglePlot } from "../api";
import { PlotTypes, SlipTypes } from "../utils/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BG_COLOR, PRIMARY_LIGHT } from "../utils/constants";
import { getDateByString, getMonthsCovered } from "../utils/utilFunctions";
import { BsThreeDots } from "react-icons/bs";
import { BiDownArrow } from "react-icons/bi";
import { MdCurrencyRupee, MdDeleteOutline, MdSell } from "react-icons/md";

const SinglePlot = () => {
    const [singlePlotData, setSinglePlotData] = useState<({clientID:{name:string;}; agentID:{name:string;};}&PlotTypes)|null>(null);

    const [allSlipsData, setAllSlipsData] = useState<SlipTypes[]>([]);
    const [clearedSlips, setClearedSlips] = useState<{cleared:number; cancelled:number;}>({cleared:0, cancelled:0});


    
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
    const [selectedSlipID, setSelectedSlipID] = useState<string>("");
    const [expendedSlipIDs, setExpendedSlipIDs] = useState<string[]>([]);


    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    const [nodeValue, setNodeValue] = useState<{lowest:number; highest:number;}>({lowest:0, highest:0});
    const [yRange, setYRange] = useState<number[]>([]);
    const [tooltipCollection, setTooltipCollection] = useState<{x:number; y:number; amount:number; date:string;}[]>([]);
    const [tooltip, setTooltip] = useState<{x:number; y:number; amount:number}>({x:0, y:0, amount:0});
    const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
    const [hoveringDotAmount, setHoveringDotAmount] = useState<number>(0);
    const [scrollLeft, setScrollLeft] = useState<number>(0);
    const [clientWidth, setClientWidth] = useState<number>(0);
    const [hoveringDotDate, setHoveringDotDate] = useState<string|null>(null);
    const [isTooltipAtEnd, setIsTooltipAtEnd] = useState<boolean>(false);
    



    const [query] = useSearchParams();
    const navigate = useNavigate();


    const plotID = query.get("plotID");
    const clientID = query.get("clientID");
    const slipID = query.get("slipID");
    //const siteID = query.get("siteID");
    //const agentID = query.get("agentID");

    const payEMIHandler = () => {

        if (singlePlotData?.plotStatus === "vacant") {
            navigate(`/create?plotID=${singlePlotData._id}&plotStatus=${singlePlotData?.plotStatus}&formPanelFor=slips`);
        }
        else{
            navigate(`/create?plotID=${singlePlotData?._id}&plotStatus=${singlePlotData?.plotStatus}&formPanelFor=slips`);
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
            setExpendedSlipIDs((prev) => prev.filter((s) => s !== expendedSlipI))

            const expendedSlip = document.getElementById(expendedSlipI);
            if (!expendedSlip) return null;
            expendedSlip.style.gridTemplateRows = "2px";
            expendedSlip.style.fontSize = "0px";
        }
        else{
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
            setAllSlipsData(data.jsonData.allSlips);
            setClearedSlips(data.jsonData.allSlips.reduce((acc, iter) => {
                if (iter.isCancelled) {
                    acc.cancelled += 1;
                }
                else{
                    acc.cleared += 1;
                }
                return acc;
            }, {cleared:0, cancelled:0}))
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
            setAllSlipsData(data.jsonData.allSlips);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [clientID]);
    useEffect(() => {
        if (!slipID || slipID === "null" || slipID === "undefined") {
            return;
        }
        findSinglePlot({slipID})
        .then((data) => {
            setSinglePlotData(data.jsonData.singlePlot);
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
            <ButtonPrimary
                text="Reset Plot Assignment"
                Icon={MdDeleteOutline}
                display="inline-flex"
                onClickHandler={resetPlotAssignmentHandler}
            />
            <ButtonPrimary
                text={singlePlotData?.plotStatus === "vacant"?"Sell To Client":"Pay EMI"}
                Icon={singlePlotData?.plotStatus === "vacant"?MdSell:MdCurrencyRupee}
                display="inline-flex"
                onClickHandler={payEMIHandler}
            />

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
                                {"Date":getDateByString(hoveringDotDate as string)},
                                {"Amount":hoveringDotAmount}
                            ]}
                            width="100px"
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
                {
                    (singlePlotData?.clientID && singlePlotData?.agentID) &&
                        <KeyValuePairs keyValuePairArray={[
                            {"Agent":singlePlotData?.agentID.name},
                            {"Client":singlePlotData?.clientID.name}
                        ]} isLoading={!singlePlotData} />
                }
                <KeyValuePairs keyValuePairArray={[
                    {"Duration":`${singlePlotData?.duration}months`},
                    {"Time Convered":getMonthsCovered(allSlipsData[0]?.createdAt)},
                    {"Should Pay":`₹${singlePlotData?.shouldPay}/-`},
                    {"Paid":`₹${singlePlotData?.paid}/-`},
                    {"Status":singlePlotData?.plotStatus}
                ]} isLoading={!singlePlotData} />

                {
                    allSlipsData[0] &&
                        <KeyValuePairs keyValuePairArray={[
                            {"First Payment Date":getDateByString(allSlipsData[0]?.createdAt)},
                            {"First Payment Amount":`₹${allSlipsData[0]?.amount}/-`},
                            {"Last Payment Date":getDateByString(allSlipsData[allSlipsData.length-1]?.createdAt)},
                            {"Last Payment Amount":`₹${allSlipsData[allSlipsData.length-1]?.amount}/-`}
                        ]} isLoading={!allSlipsData[0]} />
                }
                

                {
                    (singlePlotData?.shouldPay&&singlePlotData?.paid) ?
                        <KeyValuePairs
                            keyValuePairArray={[
                                {[-(singlePlotData.shouldPay - singlePlotData.paid)<=0?"Pending":"Extra"]:`${-(singlePlotData.shouldPay - singlePlotData.paid)}/-`}
                            ]}
                            color={singlePlotData.shouldPay - singlePlotData.paid>0?"red":"#00cc00"}
                        />
                        :
                        <></>
                }

                {
                    singlePlotData &&
                        <KeyValuePairs
                            keyValuePairArray={[
                                {"Total Slips":allSlipsData.length},
                                {"Slips (cleared)":clearedSlips.cleared},
                                {"Slips (cancelled)":clearedSlips.cancelled},
                                {"Total EMIs cleared":Number((singlePlotData?.paid||0)/(singlePlotData?.shouldPay||1)).toFixed(2)}
                            ]}
                        />
                }

                <Timer bgColor={BG_COLOR} monthsCovered={getMonthsCovered(allSlipsData[0]?.createdAt)} duration={singlePlotData?.duration} />
            </div>

            <ScrollableContainer>
                <div className="slips_cont">
                    <div className="slip_cont" style={{
                        backgroundColor:PRIMARY_LIGHT
                    }}>
                        <div className="upper_part">
                            <div className="date slip_content">Date</div>
                            <div className="slip_type slip_content">Slip Type</div>
                            <div className="slip_number slip_content">Slip No.</div>
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
                                    <div className="date slip_content">{getDateByString(slp.createdAt)}</div>
                                    <div className="slip_type slip_content">
                                        {slp.slipType}
                                    </div>
                                    <div className="slip_number slip_content">{slp.slipNo}</div>
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
                            </div>
                        ))
                    }
                </div>
            </ScrollableContainer>
        </div>
        </>
    )
};


export default SinglePlot;