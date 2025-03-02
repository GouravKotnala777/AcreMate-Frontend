import { useEffect, useState } from "react";
import { DialogBox, Heading, KeyValuePairs, Timer } from "../shared/SharedComponents";
import "../styles/pages/single_item_page.scss";
import { detachClientFromPlot, findSingleClientAllSlips, findSinglePlot, findSingleSite } from "../api";
import { PlotTypes, SiteTypes, SlipTypes } from "../utils/types";
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
export const SinglePlot = () => {
    const [singlePlotData, setSinglePlotData] = useState<PlotTypes|null>(null);
    const [firstSlipData, setFirstSlipData] = useState<SlipTypes|null>(null);
    const [lastSlipData, setLastSlipData] = useState<SlipTypes|null>(null);
    const [allSlipsData, setAllSlipsData] = useState<SlipTypes[]>([]);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
    const [selectedSlipID, setSelectedSlipID] = useState<string>("");
    const [expendedSlipIDs, setExpendedSlipIDs] = useState<string[]>([]);
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
            navigate(`/slips?plotID=${plotID}&plotStatus=${singlePlotData?.plotStatus}`);
            setSelectedRoute("slips");
            setSelectedPanel("create");
        }
        else{
            navigate(`/slips?plotID=${plotID}&plotStatus=${singlePlotData?.plotStatus}`);
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
    //const assignPlotHandler = () => {

    //    if (singlePlotData?.plotStatus === "vacant") {
    //        navigate("/SSSSSSSSSSSSSS");
    //    }
    //    else{
    //        navigate(`/slips?plotID=${plotID}`);
    //        setSelectedRoute("slips");
    //        setSelectedPanel("create");
    //    }
    //}

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
            <button onClick={resetPlotAssignmentHandler}>Reset Plot Assignment</button>
            <button onClick={payEMIHandler}>Pay EMI</button>
            {/*<pre>{JSON.stringify(singlePlotData, null, `\t`)}</pre>*/}
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
    const [singleSiteData, setSingleSiteData] = useState<SiteTypes>();

    const siteID = query.get("siteID");

    useEffect(() => {
        if (!siteID) {
            alert("SiteID not found");
            return;
        }

        findSingleSite(siteID)
        .then((data) => {
            setSingleSiteData(data.jsonData);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [siteID]);

    return(
        <div className="single_plot_bg">
            <pre>{JSON.stringify(singleSiteData, null, `\t`)}</pre>            
        </div>
    )
};

