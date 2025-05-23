import { ChangeEvent, useEffect, useState } from "react";
import { FormSharedComponent, InputTertiary } from "../shared/SharedComponents";
import { assignPlotToClient, createSite, createSlip, findAllAgents, findAllSitesName } from "../api";
import { CreateClientBodyTypes, CreatePlotBodyTypes, CreateSiteBodyTypes, CreateSlipBodyTypes, PlotTypes, SlipTypes, UserTypes } from "../utils/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const CreateFormPanel = () => {
    const [createFormData, setCreateFormData] = useState<CreateClientBodyTypes|CreatePlotBodyTypes|CreateSlipBodyTypes|CreateSiteBodyTypes|object>({});
    const [searchParams] = useSearchParams();
    const [allAgentsIDs, setAllAgentsIDs] = useState<Pick<UserTypes, "_id"|"name">[]>([]);
    const [allSitesName, setAllSitesName] = useState<string[]>([]);
    const navigate = useNavigate();

    const plotID = searchParams.get("plotID");
    const size = searchParams.get("size");
    const length = searchParams.get("length");
    const breath = searchParams.get("breath");
    const plotStatus = searchParams.get("plotStatus");
    const formPanelFor = searchParams.get("formPanelFor");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const onChangeFeildsHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        if (e.target.name === "agentID") {
            setCreateFormData({...createFormData, agentID:allAgentsIDs.find((agnt) => agnt.name === e.target.value)?._id});
        }
        else{
            setCreateFormData({...createFormData, [e.target.name]:e.target.value});
        }
    };

    const onSubmitFormHandler = async() => {
        setIsLoading(true);
        //if (formPanelFor === "clients") {
        //    const {serialNumber, name, guardian, email, gender, mobile} = createFormData as CreateClientBodyTypes;
        //    if (!serialNumber || !name || !guardian || !email || !gender || !mobile) {
        //        toast.error("All fields are required", {
        //            duration:2500,
        //            position:"top-center"
        //        });
        //        setIsLoading(false);
        //        return;
        //    }
        //    createClient(createFormData as CreateClientBodyTypes, navigate, `single-plot?plotID=${plotID}`);
        //    setIsLoading(false);
        //}
        //if (formPanelFor === "plots") {
        //    const {plotNo, rate, length, breath, site, duration, quantity} = createFormData as (CreatePlotBodyTypes&CreateClientBodyTypes&CreateSlipBodyTypes&{x:number; y:number; quantity:number;});
        //    if (!plotNo || !rate || !length || !breath || !site || !duration || !quantity) {
        //        toast.error("All fields are required", {
        //            duration:2500,
        //            position:"top-center"
        //        });
        //        setIsLoading(false);
        //        return;
        //    }
        //    //console.log(createFormData);
        //    const res = await createPlots(createFormData as CreatePlotBodyTypes&CreateClientBodyTypes&CreateSlipBodyTypes&{x:number; y:number;});

        //    if (res.success) {
        //        toast.success(res.message, {
        //            duration:2000,
        //            position:"top-center"
        //        });
        //    }
        //    else{
        //        toast.error(res.message, {
        //            duration:2000,
        //            position:"top-center"
        //        });
        //    }
        //    setIsLoading(false);
        //}
        if (formPanelFor === "slips") {
            console.log({createFormData});
            plotStatus === "vacant"?
                assignPlotToClient(({
                    ...createFormData,
                    size:Number((createFormData as PlotTypes).size||size),
                    length:Number((createFormData as PlotTypes).length||length),
                    breath:Number((createFormData as PlotTypes).breath||breath)
                }) as CreatePlotBodyTypes&CreateClientBodyTypes&CreateSlipBodyTypes, navigate, `/single-plot?plotID=${plotID}`)
                :
                createSlip(createFormData as CreateSlipBodyTypes, navigate, `/single-plot?plotID=${plotID}`);
            setIsLoading(false);
        }
        else if (formPanelFor === "sites") {
            const {siteName, totalSize} = createFormData as CreateSiteBodyTypes;
            if (!siteName || !totalSize) {
                toast.error("All fields are required", {
                    duration:2500,
                    position:"top-center"
                });
                setIsLoading(false);
                return;
            }
            const createdSite = await createSite(createFormData as CreateSiteBodyTypes);

            if (createdSite.success) {
                //navigate(`/single-site?siteID=${createdSite.jsonData._id}`);
                //navigate("/create?formPanelFor=plots");
                navigate("/sites");
                //window.location.href = "/sites";
            }
            setIsLoading(false);
        }
        else{
            console.log("formPanelFor NAHI MIL RAHA HAI line-no.32");
            alert("formPanelFor NAHI MIL RAHA HAI line-no.32");
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
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
        findAllSitesName(signal)
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
                        {type:"select", label:"Agent Name", name:"agentID", selectionOptionArray:allAgentsIDs.map((agnt) => agnt.name)},
                        {type:"number", label:"Plot no through which you want to adjust area", name:"plotNo", display:((createFormData as PlotTypes).size||(createFormData as PlotTypes).length||(createFormData as PlotTypes).breath)?"block":"none"}
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
                wildCardElement={
                    plotStatus === "vacant" &&
                    <div style={{
                        display:"flex",
                        justifyContent:"space-around",
                        margin:"10px 0"
                    }}>
                        <InputTertiary
                            label="Size"
                            name="size"
                            defaultValue={size||"0"}
                            width="60px"
                            onChangeHandler={onChangeFeildsHandler}
                        />
                        <InputTertiary
                            label="Length"
                            name="length"
                            defaultValue={length??"0"}
                            width="60px"
                            onChangeHandler={onChangeFeildsHandler}
                        />
                        <InputTertiary
                            label="Breath"
                            name="breath"
                            defaultValue={breath??"0"}
                            width="60px"
                            onChangeHandler={onChangeFeildsHandler}
                        />
                    </div>
                }
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
                isLoading={isLoading}
            />
        )
    }
    else{
        return <h1>nullish or another route create Form</h1>
    }
};

export default CreateFormPanel;