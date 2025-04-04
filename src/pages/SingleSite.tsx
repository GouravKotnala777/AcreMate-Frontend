import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PlotBeltTypes, PlotTypes, SiteTypes, UpdateSiteBodyTypes } from "../utils/types";
import { findAllPlots, findSingleSite, resetSiteRows, updateSiteRows } from "../api";
import { FormSharedComponent } from "../shared/SharedComponents";
import { PRIMARY_LIGHT } from "../utils/constants";
import "../styles/pages/single_item_page.scss";


const SingleSite = () => {
    const [query] = useSearchParams();

    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    const [siteData, setSiteData] = useState<SiteTypes|null>(null);
    const [data, setData] = useState<PlotTypes[]>([]);
    const [updateRowFormData, setUpdateRowFormData] = useState<UpdateSiteBodyTypes>({siteID:""});
    const [isSiteUpdateFormActive, setIsSiteUpdateFormActive] = useState<boolean>(false);
    const navigate = useNavigate();

    const siteID = query.get("siteID");
    const totalSize = query.get("totalSize");


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
            //throw new Error("siteData.plotsInSingleRow is empty or null");
            return;
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

    return(
        <>
            {/*<pre>{JSON.stringify(data, null, `\t`)}</pre>*/}
            <h1>{siteID}</h1>
            <h1>{totalSize}</h1>
            <button onClick={resetSiteRowHandler}>Reset site belt</button>
            <button onClick={() => setIsSiteUpdateFormActive(true)}>Update site belt in map</button>
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

            <div className="slips_cont">
                <div className="slip_cont" style={{
                    backgroundColor:PRIMARY_LIGHT
                }}>
                    <div className="slip_no slip_info slip_info_heading">ID</div>
                    <div className="name slip_info slip_info_heading">Plot No.</div>
                    <div className="s/o slip_info slip_info_heading">Size</div>
                    <div className="plot_no slip_info slip_info_heading">Rate</div>
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
                            <div className="send_sms slip_info slip_info_heading">
                                <button className="send_sms_btn" onClick={() => navigate(`/single-sit`)}>S</button>
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