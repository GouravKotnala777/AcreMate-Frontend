import { useEffect, useState } from "react";
import { Heading, KeyValuePairs, Timer } from "../shared/SharedComponents";
import "../styles/pages/single_item_page.scss";
import { findSingleClientAllSlips, findSinglePlot } from "../api";
import { PlotTypes, SlipTypes } from "../utils/types";
import { useNavigate, useParams } from "react-router-dom";
import { BG_COLOR } from "../utils/constants";
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
    const {plotID} = useParams();
    const navigate = useNavigate();
    const {setSelectedRoute, setSelectedPanel} = useSelectedRoute();


    const payEMIHAndler = () => {

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
        if (!plotID) {
            alert("plotID not found");
            return;
        }
        findSinglePlot(plotID)
        .then((data) => {
            setSinglePlotData(data.jsonData.singlePlot);
            setFirstSlipData(data.jsonData.firstSlip);
            setLastSlipData(data.jsonData.lastSlip);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [plotID]);

    return(
        <div className="single_plot_bg">
            {/*<Heading text={`Plot No. ${plotID}`} />*/}
            {/*<button onClick={assignPlotHandler}>Assign plot</button>*/}
            <button onClick={payEMIHAndler}>Pay EMI</button>
            {/*<pre>{JSON.stringify(singlePlotData, null, `\t`)}</pre>*/}
            <div className="plot_info_cont">
                <KeyValuePairs keyValuePairArray={[
                    {"Plot No.":singlePlotData?.plotNo||0},
                    {"Plot Size":`${singlePlotData?.size}sqyd`||"0sqyd"},
                    {"Plot Rate":`₹${singlePlotData?.rate}/-`||"₹0/-"},
                    {"Dimensions":`${singlePlotData?.length||0}X${singlePlotData?.breath||0}`}
                ]} />
                <KeyValuePairs keyValuePairArray={[
                    {"Agent":singlePlotData?.agentID||"----"},
                    {"Client":singlePlotData?.clientID||"----"}
                ]} />
                <KeyValuePairs keyValuePairArray={[
                    {"Duration":`${singlePlotData?.duration}months`||0},
                    {"Time Convered":getMonthsCovered(firstSlipData?.createdAt)},
                    {"Should Pay":`₹${singlePlotData?.shouldPay}/-`||"₹0/-"},
                    {"Paid":`₹${singlePlotData?.paid}/-`||"₹0/-"},
                    {"Status":singlePlotData?.plotStatus||0}
                ]} />

                {
                    (firstSlipData?.createdAt&&lastSlipData?.createdAt) ?
                        <KeyValuePairs keyValuePairArray={[
                            {"First Payment Date":new Date(firstSlipData?.createdAt)?.toLocaleString(undefined, {day:"numeric", month:"short", year:"numeric"})},
                            {"First Payment Amount":`₹${firstSlipData.amount}/-`},
                            {"Last Payment Date":new Date(lastSlipData?.createdAt)?.toLocaleString(undefined, {day:"numeric", month:"short", year:"numeric"})},
                            {"Last Payment Amount":`₹${lastSlipData.amount}/-`}
                        ]} />
                        :
                        <KeyValuePairs keyValuePairArray={[
                            {"First Payment Date":"----"},
                            {"First Payment Amount":"₹0/-"},
                            {"Last Payment Date":"----"},
                            {"Last Payment Amount":"₹0/-"}
                        ]} />
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

