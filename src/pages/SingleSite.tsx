import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PlotBeltTypes, PlotTypes, SiteTypes, UpdateSiteBodyTypes } from "../utils/types";
import { findAllPlots, findSingleSite, resetSiteRows, updateSiteRows } from "../api";
import { KeyValuePairs } from "../shared/SharedComponents";
import { PRIMARY_LIGHT } from "../utils/constants";
import "../styles/pages/single_item_page.scss";


const SingleSite = () => {
    const [query] = useSearchParams();

    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    const [siteData, setSiteData] = useState<SiteTypes|null>(null);
    const [data, setData] = useState<PlotTypes[]>([]);
    const [updateRowFormData, setUpdateRowFormData] = useState<UpdateSiteBodyTypes>({siteID:"", baseSize:0, noOfPlots:0});
    const [isSiteUpdateFormActive, setIsSiteUpdateFormActive] = useState<boolean>(false);
    const [trackedArea, setTrackedArea] = useState<number>(0);
    const noOfPlots = useRef<HTMLInputElement|null>(null);
    const lastPlotNo = useRef<HTMLInputElement|null>(null);
    const baseSize = useRef<HTMLInputElement|null>(null);
    //const [vacantArea, setVacantArea] = useState<number>(0);
    const navigate = useNavigate();

    const siteID = query.get("siteID");
    //const totalSize = query.get("totalSize");


    //const findAllPlotsHandler = async() => {
    //    const res = await findAllPlots();
    //    setData(res.jsonData);
    //};
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setUpdateRowFormData({...updateRowFormData, [e.target.name]:e.target.value});        
    };
    const updateSiteRowHandler = async() => {
        if (!siteID) return;
        const res = await updateSiteRows({...updateRowFormData, siteID:siteID});
        setSiteData(res.jsonData);
        setTrackedArea(res.jsonData.plotsInSingleRow.reduce((acc, iter) => {
            return (acc += (iter.baseSize * iter.noOfPlots)) || 0;
        }, 0));
        updateUI();
    };
    const resetSiteRowHandler = async() => {
        if (!siteID) return;
        const res = await resetSiteRows({siteID});
        setSiteData(res.jsonData);
        setTrackedArea(res.jsonData.plotsInSingleRow.reduce((acc, iter) => {
            return (acc += (iter.baseSize * iter.noOfPlots))||0;
        }, 0))
        updateUI();
    };

    const updateUI = () => {
        const no_of_plots = noOfPlots.current;
        const last_plot_no = lastPlotNo.current;
        const base_size = baseSize.current;

        if (!no_of_plots || !last_plot_no || !base_size) return;

        no_of_plots.value = "";
        last_plot_no.value = "";
        base_size.value = "";
        setUpdateRowFormData({...updateRowFormData, baseSize:0, lastPlotNo:0, noOfPlots:0});
    }


    useEffect(() => {
        if (data.length === 0) return;
        
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
            //throw new Error("siteData.plotsInSingleRow is empty or null");
            return;
        }

        for(const objIndex in (siteData?.plotsInSingleRow as PlotBeltTypes[])){
            let rowWidth:number = 0;
            let soldArea:number = 0;
            let finalWidth = 0;
            for(let i=(Number(siteData.plotsInSingleRow[Number(objIndex)].lastPlotNo)-Number(siteData.plotsInSingleRow[Number(objIndex)].noOfPlots)); i<siteData.plotsInSingleRow[Number(objIndex)].lastPlotNo; i++){
                const w = data[i]?.size;
                finalWidth = rowWidth+data[Number(i)]?.size-w;

                if (data[Number(i)]?.hasSold) {
                    soldArea += data[i]?.size;
                }
                //if (data[Number(i)].plotStatus === "completed" || data[Number(i)].plotStatus === "pending" || data[Number(i)].plotStatus === "registered") {
                //    soldArea += data[i].size;
                //}
                if (data[Number(i)]?.plotStatus === "vacant") {
                    ctx.fillStyle = "#ffa0a0";
                }
                else if (data[Number(i)]?.plotStatus === "registered" || data[Number(objIndex)]?.plotStatus === "completed") {
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
                ctx.fillText(`${data[i]?.plotNo}`, finalWidth+w/2, (boxH/2)+(Number(objIndex)*boxY)+(Number(objIndex)*boxH)-5);
                ctx.fillText(`${data[i]?.size}`, finalWidth+w/2, (boxH/2)+(Number(objIndex)*boxY)+(Number(objIndex)*boxH)+10);
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
            //setVacantArea(data.jsonData.totalSize - data.jsonData.soldArea)
            setTrackedArea(
                data.jsonData.plotsInSingleRow.reduce((acc, iter) => {
                return (acc += (iter.baseSize * iter.noOfPlots))||0;
            }, 0))
        })
        .catch((err) => {
            console.log(err);
        });
        //findAllPlotsHandler();
    }, [siteID]);


    useEffect(() => {
        if (!siteData) return;

        findAllPlots(siteData?.siteName)
        .then((data) => {
            setData(data.jsonData)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [siteData]);

    useEffect(() => {
        if (!siteData) return;

        //if (updateRowFormData.baseSize === 0 || updateRowFormData.noOfPlots === 0) {
        //    setVacantArea(siteData.totalSize - siteData?.soldArea - 0);
        //    return;
        //}

        //setVacantArea(siteData.totalSize - siteData?.soldArea - (Number(updateRowFormData.baseSize)*Number(updateRowFormData.noOfPlots)))
        //setVacantArea((prev) => prev - (Number(updateRowFormData.baseSize)*Number(updateRowFormData.noOfPlots)))

    }, [siteData, updateRowFormData, siteID]);

    return(
        <>
            <h3>Single Site</h3>
            {/*<pre>{JSON.stringify(trackedArea, null, `\t`)}</pre>*/}
            <KeyValuePairs keyValuePairArray={[
                {"Total Area":siteData?.totalSize},
                {"Tracked Area":`${trackedArea??0} + ${(Number(updateRowFormData.baseSize)*Number(updateRowFormData.noOfPlots))}`},
                {"Untracked Area":(siteData?.totalSize as number) - trackedArea - (Number(updateRowFormData.baseSize)*Number(updateRowFormData.noOfPlots))}
            ]} />
            <button onClick={resetSiteRowHandler}>Reset site belt</button>
            <button onClick={() => setIsSiteUpdateFormActive(true)}>Update site belt in map</button>
            {
                isSiteUpdateFormActive &&
                    <div className="site_update_form">
                        <input type="text" ref={noOfPlots} name="noOfPlots" placeholder="No. of plots" onChange={onChangeHandler} />
                        <input type="text" ref={lastPlotNo} name="lastPlotNo" placeholder="Last plot no." onChange={onChangeHandler} />
                        <input type="text" ref={baseSize} name="baseSize" placeholder="Base size" onChange={onChangeHandler} />
                        <button onClick={
                            (siteData?.totalSize as number) - (trackedArea) > 0 ?
                                    updateSiteRowHandler
                                    :
                                    async() => {alert("Can't sell plot more than vacant area!")}
                        }>Update</button>
                    </div>
                    //<FormSharedComponent
                    //    inputArray={[
                    //        {type:"text", label:"No. of plots in this Belt", name:"noOfPlots"},
                    //        {type:"text", label:"Last plot number in this belt", name:"lastPlotNo"},
                    //        {type:"text", label:"Plot base size", name:"baseSize"}
                    //    ]}
                    //    btnText="Update Plot Belt"
                    //    onChangeFeildsHandler={onChangeHandler}
                    //    onSubmitFormHandler={
                    //        (siteData?.totalSize as number) - (trackedArea) > 0 ?
                    //        updateSiteRowHandler
                    //        :
                    //        async() => {alert("Can't sell plot more than vacant area!")}
                    //    }
                    ///>
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
                    <h3>Your Site Chart will show here</h3>

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

            <div className="slips_cont">
                <div className="slip_cont" style={{
                    backgroundColor:PRIMARY_LIGHT
                }}>
                    <div className="slip_no slip_info slip_info_heading">ID</div>
                    <div className="name slip_info slip_info_heading">Plot No.</div>
                    <div className="s/o slip_info slip_info_heading">Size</div>
                    <div className="plot_no slip_info slip_info_heading">Rate</div>
                    <div className="plot_no slip_info slip_info_heading">Status</div>
                    <div className="plot_no slip_info slip_info_heading">View</div>
                    <div className="plot_no slip_info slip_info_heading">Patoni</div>
                </div>
                {
                    data.map((plt) => (
                        <div className="slip_cont" key={plt._id}>
                            <div className="slip_no slip_info">{plt._id}</div>
                            <div className="slip_no slip_info">{plt.plotNo}</div>
                            <div className="slip_no slip_info">{plt.size}</div>
                            <div className="slip_no slip_info">{plt.rate}</div>
                            <div className="slip_no slip_info">{plt.plotStatus}</div>
                            <div className="send_sms slip_info slip_info_heading">
                                <button className="send_sms_btn" onClick={() => navigate(`/single-plot?plotID=${plt._id}`)}>S</button>
                            </div>
                            <div className="send_sms slip_info slip_info_heading">
                                <button className="send_sms_btn" onClick={() => navigate("/create?formPanelFor=plots")}>Add Plots</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
};

export default SingleSite;