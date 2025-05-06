import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ApiResponseTypes, PlotBeltTypes, PlotTypes, SiteTypes, UpdateSiteBodyTypes } from "../utils/types";
import { findAllPlots, findSingleSite, resetSiteRows, updateSite, updateSiteRows } from "../api";
import { ButtonPrimary, HeadingParaCont, KeyValuePairs, ScrollableContainer, Skeleton } from "../shared/SharedComponents";
import { PRIMARY_LIGHT, PRIMARY_LIGHTER } from "../utils/constants";
import "../styles/pages/single_item_page.scss";
import ListHeading from "../components/ListHeading";
import ListItem from "../components/ListItem";
import { BsInfoSquare } from "react-icons/bs";
import DataFlowHandler from "../components/DataFlow";
import { BiAddToQueue } from "react-icons/bi";
import { GrUpdate } from "react-icons/gr";
import Modal from "../components/Modal";


const SingleSite = () => {
    const [query] = useSearchParams();

    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<{success:boolean; message:string; jsonData:object}>({success:false, message:"", jsonData:{}});
    const [isError, setIsError] = useState<boolean>(false);
    const [siteData, setSiteData] = useState<SiteTypes|Record<string, never>>({});
    const [allPlots, setAllPlots] = useState<PlotTypes[]>([]);
    const [updateRowFormData, setUpdateRowFormData] = useState<UpdateSiteBodyTypes>({siteID:"", baseSize:0, noOfPlots:0});
    const [isSiteRowsUpdateFormActive, setIsSiteRowsUpdateFormActive] = useState<boolean>(false);
    const [isUpdateSiteFormActive, setIsUpdateSiteFormActive] = useState<boolean>(false);
    const [trackedArea, setTrackedArea] = useState<number>(0);
    const [totalSiteCalculations, setTotalSiteCalculations] = useState<{totalSoldArea:number; totalRemainingArea:number; totalShouldPay:number; totalPaid:number; totalPending:number;}>({totalSoldArea:0, totalRemainingArea:0, totalShouldPay:0, totalPaid:0, totalPending:0});
    const [updateSiteForm, setUpdateSiteForm] = useState<UpdateSiteBodyTypes>({siteID:"", soldArea:0, totalSize:0});
    //const [aa, setAa] = useState<{}>({});
    const noOfPlots = useRef<HTMLInputElement|null>(null);
    const lastPlotNo = useRef<HTMLInputElement|null>(null);
    const baseSize = useRef<HTMLInputElement|null>(null);
    //const [vacantArea, setVacantArea] = useState<number>(0);
    const navigate = useNavigate();

    const siteID = query.get("siteID");

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setUpdateRowFormData({...updateRowFormData, [e.target.name]:e.target.value});        
    };
    const updateResetSiteRowHandler = async(fore:"update"|"reset") => {
        if (!siteID) return;
        let res:ApiResponseTypes<SiteTypes|Record<string, never>> = {success:false, message:"", jsonData:{}};

        if (fore === "update") {
            res = await updateSiteRows({...updateRowFormData, siteID:siteID});

        }
        else if (fore === "reset") {
            res = await resetSiteRows({siteID});
        }
        else{
            console.log("didn't found updateResetSiteRowHandler's parameter 'fore'");
        }
        setSiteData(res.jsonData);
        setTrackedArea(res.jsonData.plotsInSingleRow.reduce((acc, iter) => {
            return (acc += (iter.baseSize * iter.noOfPlots)) || 0;
        }, 0));
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

    const navigateToSinglePageHandler = (plotID:string) => {
        navigate(`/single-plot?plotID=${plotID}`);
    };

    const navigateToAddPlotPageHandler = () => {
        navigate(`/create?formPanelFor=plots`);
    };

    const changeUpdateSiteHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setUpdateSiteForm({...updateSiteForm, [e.target.name]:e.target.value});
    }
    const updateSiteHandler = async() => {
        updateSite({...updateSiteForm, siteID:siteData._id});
        console.log({...updateSiteForm, siteID:siteData._id});
    }
    const cancelUpdateSiteHandler = () => {
        console.log("cancelled");
    }


    useEffect(() => {
        if (allPlots.length === 0) return;
        
        const boxH = 30;
        const boxY = 10;
        
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        
        //canvas.width = window.innerWidth;
        canvas.height = 300;
        
        const ctx = canvas.getContext("2d");
        
        if (!ctx) return;
        

        if (!siteData || siteData?.plotsInSingleRow?.length === 0) {
            alert("siteData.plotsInSingleRow is empty");
            //throw new Error("siteData.plotsInSingleRow is empty or null");
            return;
        }

        for(const objIndex in (siteData?.plotsInSingleRow as PlotBeltTypes[])){
            let rowWidth:number = 0;
            let soldArea:number = 0;
            let finalWidth = 0;
            for(let i=(Number(siteData.plotsInSingleRow[Number(objIndex)].lastPlotNo)-Number(siteData.plotsInSingleRow[Number(objIndex)].noOfPlots)); i<siteData.plotsInSingleRow[Number(objIndex)].lastPlotNo; i++){
                const w = allPlots[i]?.size;
                finalWidth = rowWidth+allPlots[Number(i)]?.size-w;

                if (allPlots[Number(i)]?.hasSold) {
                    soldArea += allPlots[i]?.size;
                }
                //if (data[Number(i)].plotStatus === "completed" || data[Number(i)].plotStatus === "pending" || data[Number(i)].plotStatus === "registered") {
                //    soldArea += data[i].size;
                //}
                if (allPlots[Number(i)]?.plotStatus === "vacant") {
                    ctx.fillStyle = "#ffa0a0";
                }
                else if (allPlots[Number(i)]?.plotStatus === "registered" || allPlots[Number(objIndex)]?.plotStatus === "completed") {
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
                ctx.fillText(`${allPlots[i]?.plotNo}`, finalWidth+w/2, (boxH/2)+(Number(objIndex)*boxY)+(Number(objIndex)*boxH)-5);
                ctx.fillText(`${allPlots[i]?.size}`, finalWidth+w/2, (boxH/2)+(Number(objIndex)*boxY)+(Number(objIndex)*boxH)+10);
            }
            ctx.fillText(`=> ${soldArea}sqyd / ${rowWidth}sqyd`, rowWidth+allPlots[allPlots.length-1].size, (Number(objIndex)*boxY)+(Number(objIndex)*boxH)+15);
        }

    }, [siteData, allPlots]);

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
            if (data.success) {
                setAllPlots(data.jsonData);
                setIsLoading(false);
                setIsError(false);
                setTotalSiteCalculations(
                    data.jsonData.reduce((acc, iter) => {
                        if (iter.hasSold) {
                            acc.totalShouldPay += iter.shouldPay; // shouldPay is one EMI of one month i will multiply with time covered to get shouldPay of one plot after a certain time covered
                            acc.totalPaid += iter.paid;
                            acc.totalPending += (iter.paid-iter.shouldPay);
                            acc.totalSoldArea += iter.size;
                        }
                        else{
                            acc.totalRemainingArea += iter.size;
                        }
                        return acc;
                    }, {
                        totalSoldArea:0,
                        totalRemainingArea:0,
                        totalShouldPay:0,
                        totalPaid:0,
                        totalPending:0
                    })
                );
                //setTotalSiteCalculations(
                //    data.jsonData.reduce((acc, iter) => {
                //        if (iter.hasSold) {
                //            acc.totalSoldArea += iter.size;
                //        }
                //        else{
                //            acc.totalRemainigArea += iter.size;
                //        }
                //        return acc;
                //    }, {totalSoldArea:0, totalRemainigArea:0, totalShouldPay:0, totalPaid:0, totalPending:0})
                //);
            }
            else{
                setError(data);
                setIsLoading(false);
                setIsError(true);
            }
        })
        .catch((err) => {
            console.log(err);
            setError(err);
            setIsLoading(false);
            setIsError(true);
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
            <Modal
                heading="Update Site"
                isOpen={isUpdateSiteFormActive}
                setIsOpen={setIsUpdateSiteFormActive}
                onChangeHandler={(e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => changeUpdateSiteHandler(e)}
                onSubmitHandler={updateSiteHandler}
                onCancelHandler={cancelUpdateSiteHandler}
            />
            <ButtonPrimary
                text="Update Site"
                Icon={GrUpdate}
                onClickHandler={() => setIsUpdateSiteFormActive(true)}
                display="inline-flex"
            />
            <ButtonPrimary
                text="Create Plots"
                Icon={BiAddToQueue}
                onClickHandler={navigateToAddPlotPageHandler}
                display="inline-flex"
            />
            <KeyValuePairs keyValuePairArray={[
                {"Total Area":siteData?.totalSize},
                {"Sold Area":totalSiteCalculations.totalSoldArea},
                {"Remaining Area":totalSiteCalculations.totalRemainingArea},
            ]} margin="10px auto"
            />
            <KeyValuePairs keyValuePairArray={[
                {"Should Pay":totalSiteCalculations.totalShouldPay},
                {"Paid":totalSiteCalculations.totalPaid},
                {"Total Pendings":totalSiteCalculations.totalPending},
            ]} margin="10px auto" backgroundColor={PRIMARY_LIGHT} />
            <KeyValuePairs keyValuePairArray={[
                {"Tracked Area":`${trackedArea??0} + ${(Number(updateRowFormData.baseSize)*Number(updateRowFormData.noOfPlots))}`},
                {"Untracked Area":(siteData?.totalSize??0) - trackedArea - (Number(updateRowFormData.baseSize)*Number(updateRowFormData.noOfPlots))}
            ]} margin="10px auto" />
            <button onClick={() => updateResetSiteRowHandler("reset")}>Reset site belt</button>
            <button onClick={() => setIsSiteRowsUpdateFormActive(true)}>Update site belt in map</button>
            {
                isSiteRowsUpdateFormActive &&
                    <div className="site_update_form">
                        <input type="text" ref={noOfPlots} name="noOfPlots" placeholder="No. of plots" onChange={onChangeHandler} />
                        <input type="text" ref={lastPlotNo} name="lastPlotNo" placeholder="Last plot no." onChange={onChangeHandler} />
                        <input type="text" ref={baseSize} name="baseSize" placeholder="Base size" onChange={onChangeHandler} />
                        <button onClick={
                            (siteData?.totalSize as number) - (trackedArea) > 0 ?
                                    () => updateResetSiteRowHandler("update")
                                    :
                                    () => {alert("Can't sell plot more than vacant area!")}
                        }>Update</button>
                    </div>
            }

            {
                allPlots.length !== 0 ?
                    <ScrollableContainer>
                        <canvas width={1200} ref={canvasRef}
                            style={{
                                backgroundColor:PRIMARY_LIGHTER,
                                height:"300px"
                            }}
                        >
                        </canvas>
                    </ScrollableContainer>
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
                    siteData?.plotsInSingleRow?.map((belt, index) => (
                        <div className="belt" key={index}>
                            <div className="plot_quantity">{`(${index+1})`}</div>
                            <div className="plot_quantity">{belt.noOfPlots}</div>
                            <div className="last_plot">{belt.lastPlotNo}</div>
                            <div className="base_size">{belt.baseSize}</div>
                        </div>
                    ))
                }
            </div>

            <ScrollableContainer tableStickyColumn={allPlots.map((plt) => ("Plot No. " + plt.plotNo.toString()))}>
                <ListHeading
                    headingRow={[
                        {itemValue:"ID", itemWidth:"14%"},
                        {itemValue:"Plot No.", itemWidth:"14%"},
                        {itemValue:"Size", itemWidth:"14%"},
                        {itemValue:"Rate", itemWidth:"14%"},
                        {itemValue:"Status", itemWidth:"14%"},
                        {itemValue:"Info", itemWidth:"14%"}
                    ]}
                />

                <DataFlowHandler
                    isLoading={isLoading}
                    isError={isError}
                    dataArray={allPlots}
                    
                    LoadingComponent={
                        <>
                            <Skeleton width="100%" height="25px" margin="10px 0" />
                            <Skeleton width="100%" height="25px" margin="10px 0" />
                            <Skeleton width="100%" height="25px" margin="10px 0" />
                            <Skeleton width="100%" height="25px" margin="10px 0" />
                            <Skeleton width="100%" height="25px" margin="10px 0" />
                            <Skeleton width="100%" height="25px" margin="10px 0" />
                        </>
                        
                    }
                    DataNotExistComponent={
                        <HeadingParaCont
                            heading="No Sites"
                            para="Your sites will be shown here"
                        />
                    }
                    DataExistComponent={
                        allPlots.map((plt) => (
                            <ListItem
                                key={plt._id}
                                uniqeKey={plt._id}
                                cellWidth={[
                                    "14%",
                                    "14%",
                                    "14%",
                                    "14%",
                                    "14%",
                                    "14%"
                                ]}
                                row={[
                                    {itemValue:plt._id},
                                    {itemValue:plt.plotNo},
                                    {itemValue:plt.size},
                                    {itemValue:plt.rate},
                                    {itemValue:plt.plotStatus},
                                    {itemValue:"info", isButton:true, btnIcon:BsInfoSquare, onClickHanlder:()=>navigateToSinglePageHandler(plt._id)}
                                ]}
                            />
                        ))
                    }
                    ErrorComponent={
                        <HeadingParaCont
                            heading="Something went wrong"
                            para={error.message}
                        />
                    }
                />
            </ScrollableContainer>
        </>
    )
};

export default SingleSite;