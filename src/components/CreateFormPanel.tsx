import { ChangeEvent, useEffect, useState } from "react";
import { FormSharedComponent } from "../shared/SharedComponents";
import { assignPlotToClient, createClient, createPlots, createSite, createSlip, findAllAgents, findAllSitesName } from "../api";
import { CreateClientBodyTypes, CreatePlotBodyTypes, CreateSiteBodyTypes, CreateSlipBodyTypes, SlipTypes, UserTypes } from "../utils/types";
import { useNavigate, useSearchParams } from "react-router-dom";

const CreateFormPanel = () => {
    const [createFormData, setCreateFormData] = useState<CreateClientBodyTypes|CreatePlotBodyTypes|CreateSlipBodyTypes|CreateSiteBodyTypes|object>({});
    const [searchParams] = useSearchParams();
    const [allAgentsIDs, setAllAgentsIDs] = useState<Pick<UserTypes, "_id"|"name">[]>([]);
    const [allSitesName, setAllSitesName] = useState<string[]>([]);
    const navigate = useNavigate();

    const plotID = searchParams.get("plotID");
    const plotStatus = searchParams.get("plotStatus");
    const formPanelFor = searchParams.get("formPanelFor");
    
    const onChangeFeildsHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        if (e.target.name === "agentID") {
            setCreateFormData({...createFormData, agentID:allAgentsIDs.find((agnt) => agnt.name === e.target.value)?._id});
        }
        else{
            setCreateFormData({...createFormData, [e.target.name]:e.target.value});
        }
    };

    const onSubmitFormHandler = async() => {
        if (formPanelFor === "clients") {
            createClient(createFormData as CreateClientBodyTypes, navigate, `single-plot?plotID=${plotID}`);
        }
        else if (formPanelFor === "plots") {
            //console.log(createFormData);
            createPlots(createFormData as CreatePlotBodyTypes&CreateClientBodyTypes&CreateSlipBodyTypes);
        }
        else if (formPanelFor === "slips") {
            //console.log(createFormData);
            plotStatus === "vacant"?
                assignPlotToClient(createFormData as CreatePlotBodyTypes&CreateClientBodyTypes&CreateSlipBodyTypes)
                :
                createSlip(createFormData as CreateSlipBodyTypes, navigate, `/single-plot?plotID=${plotID}`);
        }
        else if (formPanelFor === "sites") {
            createSite(createFormData as CreateSiteBodyTypes);
        }
        else{
            console.log("formPanelFor NAHI MIL RAHA HAI line-no.32");
            alert("formPanelFor NAHI MIL RAHA HAI line-no.32");
        }
    }

    useEffect(() => {
        if (plotID) {
            setCreateFormData({...createFormData, plotID});
        }
        findAllAgents()
        .then((data) => {
            setAllAgentsIDs(data.jsonData);
        })
        .catch((err) => {
            console.log(err);
        });
        findAllSitesName()
        .then((data) => {
            setAllSitesName(data.jsonData);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [plotID]);

    if (formPanelFor === "clients") {
        return(
            <FormSharedComponent inputArray={[
                {type:"text", label:"Serial No.", name:"serialNumber"},
                {type:"text", label:"Client Name", name:"name"},
                {type:"text", label:"Guardian's Name", name:"guardian"},
                {type:"text", label:"Email", name:"email"},
                {type:"select", label:"Gender", name:"gender", selectionOptionArray:["male", "female", "other"]},
                {type:"text", label:"Mobile", name:"mobile"},
            ]}
            btnText="Create New Client"
            onChangeFeildsHandler={onChangeFeildsHandler}
            onSubmitFormHandler={onSubmitFormHandler}
            />
        )
    }
    else if (formPanelFor === "plots") {
        return(
            <FormSharedComponent
                inputArray={[
                    {type:"text", label:"First Plot No. In Row", name:"plotNo"},
                    {type:"text", label:"Plot Size", name:"size"},
                    {type:"text", label:"Plot Quantity", name:"quantity"},
                    {type:"text", label:"Plot Rate", name:"rate"},
                    {type:"text", label:"Duration", name:"duration"},
                    {type:"text", label:"Plot Breath", name:"breath"},
                    {type:"text", label:"Plot Length", name:"length"},
                    {type:"select", label:"Site Name", name:"site", selectionOptionArray:allSitesName}
                ]}
                btnText="Created New Plots"
                onChangeFeildsHandler={onChangeFeildsHandler}
                onSubmitFormHandler={onSubmitFormHandler}
            />
        )
    }
    else if (formPanelFor === "slips") {
        return(
            <FormSharedComponent
                inputArray={
                    plotStatus === "vacant"?
                    [
                        {type:"text", label:"Client Serial Number", name:"serialNumber"},
                        {type:"text", label:"Client Name", name:"name"},
                        {type:"text", label:"Guardian's Name", name:"guardian"},
                        {type:"text", label:"Client Email", name:"email"},
                        {type:"select", label:"Gender", name:"gender", selectionOptionArray:["male", "female", "other"]},
                        {type:"text", label:"Mobile Number", name:"mobile"},
                        {type:"select", label:"Slip Type", name:"slipType", selectionOptionArray:["downpay", "token", "emi"]},
                        {type:"text", label:"Slip No.", name:"slipNo"},
                        {type:"select", label:"Mode Of Payment", name:"modeOfPayment", selectionOptionArray:["cash", "cheque", "transfer"]},
                        {
                            ...((createFormData as SlipTypes).modeOfPayment === "cheque"?
                                {type:"text", label:"Cheque No.", name:"paymentID"}
                                :
                                (createFormData as SlipTypes).modeOfPayment === "transfer"?
                                    {type:"text", label:"Transaction ID", name:"paymentID"}
                                    :
                                    {type:"text", label:"", name:"", display:"none"}
                            )
                        },
                        {type:"text", label:"Amount", name:"amount"},
                        {type:"select", label:"Agent Name", name:"agentID", selectionOptionArray:allAgentsIDs.map((agnt) => agnt.name)},// isko alag se fetch karna hai
                        {type:"number", label:"Plot size you want to sell", name:"size"},
                        {type:"number", label:"Plot no through which you want to adjust area", name:"plotNo"}
                    ]
                    :
                    [
                        {type:"select", label:"Slip Type", name:"slipType", selectionOptionArray:["downpay", "token", "emi"]},
                        {type:"text", label:"Slip No.", name:"slipNo"},
                        {type:"select", label:"Mode Of Payment", name:"modeOfPayment", selectionOptionArray:["cash", "cheque", "transfer"]},
                        {
                            ...((createFormData as SlipTypes).modeOfPayment === "cheque"?
                                {type:"text", label:"Cheque No.", name:"paymentID"}
                                :
                                (createFormData as SlipTypes).modeOfPayment === "transfer"?
                                    {type:"text", label:"Transaction ID", name:"paymentID"}
                                    :
                                    {type:"text", label:"", name:"", display:"none"}
                            )
                        },
                        {type:"text", label:"Amount", name:"amount"}
                    ]
                }
                btnText={plotStatus === "vacant"?"Assign Plot":"Create Slip"}
                onChangeFeildsHandler={onChangeFeildsHandler}
                onSubmitFormHandler={onSubmitFormHandler}
            />
            )
    }
    else if (formPanelFor === "sites") {
        return (
            <FormSharedComponent
                inputArray={[
                    {label:"Site Name", name:"siteName", type:"text"},
                    {label:"Total Size", name:"totalSize", type:"text"}
                ]}
                btnText="Create Site"
                onChangeFeildsHandler={onChangeFeildsHandler}
                onSubmitFormHandler={onSubmitFormHandler}
            />
        )
    }
    else{
        return <h1>nullish or another route create Form</h1>
    }
};

export default CreateFormPanel;