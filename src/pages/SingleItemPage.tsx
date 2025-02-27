import { useEffect, useState } from "react";
import { Heading, KeyValuePairs, Timer } from "../shared/SharedComponents";
import "../styles/pages/single_item_page.scss";
import { findSingleClientAllSlips, findSinglePlot } from "../api";
import { PlotTypes, SlipTypes } from "../utils/types";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BG_COLOR, PRIMARY_LIGHT } from "../utils/constants";
import { useSelectedRoute } from "../Context";
import { getMonthsCovered } from "../utils/utilFunctions";
import Table from "../shared/Table";

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
    const [query] = useSearchParams();
    const navigate = useNavigate();
    const {setSelectedRoute, setSelectedPanel} = useSelectedRoute();


    const plotID = query.get("plotID");
    const clientID = query.get("clientID");
    const slipID = query.get("slipID");
    const siteID = query.get("siteID");
    const agentID = query.get("agentID");

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
        <div className="single_plot_bg">
            {/*<Heading text={`Plot No. ${plotID}`} />*/}
            {/*<button onClick={assignPlotHandler}>Assign plot</button>*/}
            <button onClick={payEMIHandler}>Pay EMI</button>
            {/*<pre>{JSON.stringify(singlePlotData, null, `\t`)}</pre>*/}
            <div className="plot_info_cont">
                <KeyValuePairs keyValuePairArray={[
                    {"Plot No.":singlePlotData?.plotNo},
                    {"Plot Size":`${singlePlotData?.size}sqyd`},
                    {"Plot Rate":`₹${singlePlotData?.rate}/-`},
                    {"Dimensions":`${singlePlotData?.length}X${singlePlotData?.breath}`}
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
                                {"Pending":`${-(singlePlotData.shouldPay - singlePlotData.paid)}/-`}
                            ]}
                            color={singlePlotData.shouldPay - singlePlotData.paid>0?"red":"#00cc00"}
                        />
                }

                <Timer bgColor={BG_COLOR} monthsCovered={getMonthsCovered(firstSlipData?.createdAt)} duration={singlePlotData?.duration} />
            </div>
            <div className="slips_cont">
                <div className="slip_cont" style={{
                    backgroundColor:PRIMARY_LIGHT
                }}>
                    <div className="date slip_content">Date</div>
                    <div className="slip_type slip_content">Slip Type</div>
                    <div className="slip_number slip_content">Slip No.</div>
                    <div className="client_name slip_content">Client Name</div>
                    <div className="amount slip_content">Amount</div>
                    <div className="mode slip_content">Mode Of Payment</div>
                </div>
                {
                    allSlipsData.map((slp) => (
                        <div className="slip_cont" key={slp._id} style={{
                            backgroundColor:slp.isCancelled ?
                                "red"
                                :
                                "white"
                        }}>
                            <div className="date slip_content">{new Date(slp.createdAt).toLocaleDateString(undefined, {day:"2-digit", month:"2-digit", year:"numeric"})}</div>
                            <div className="slip_type slip_content">{slp.slipType}</div>
                            <div className="slip_number slip_content">{slp.slipNo}</div>
                            <div className="client_name slip_content">{slp.clientID}</div>
                            <div className="amount slip_content">₹{slp.amount}/-</div>
                            {/*<div className="admin slip_content"></div>*/}
                            <div className="mode slip_content">{slp.modeOfPayment}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};
export const SingleSlip = () => {

    return(
        <div className="single_plot_bg">

        </div>
    )
};
export const SingleSite = () => {

    return(
        <div className="single_plot_bg">

        </div>
    )
};

