import { ChangeEvent, DragEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PlotTypes, SiteTypes, UpdateSiteBodyTypes } from "../utils/types";
import { createPlots, findAllPlots, findSingleSite, updatePlotCoordinates, updateSite } from "../api";
import { ButtonPrimary, HeadingParaCont, KeyValuePairs, ScrollableContainer, Skeleton } from "../shared/SharedComponents";
import { PRIMARY_LIGHT } from "../utils/constants";
import "../styles/pages/single_item_page.scss";
import ListHeading from "../components/ListHeading";
import ListItem from "../components/ListItem";
import { BsInfoSquare } from "react-icons/bs";
import DataFlowHandler from "../components/DataFlow";
import { BiAddToQueue } from "react-icons/bi";
import { GrUpdate } from "react-icons/gr";
import Modal from "../components/Modal";
import { LuGrab, LuMapPinCheck } from "react-icons/lu";
import toast from "react-hot-toast";
import { MdSell } from "react-icons/md";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { RxCross1 } from "react-icons/rx";
import { ImInfo } from "react-icons/im";


const SingleSite = () => {
    const [query] = useSearchParams();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<{success:boolean; message:string; jsonData:object}>({success:false, message:"", jsonData:{}});
    const [isError, setIsError] = useState<boolean>(false);
    const [siteData, setSiteData] = useState<SiteTypes|Record<string, never>>({});
    const [allPlots, setAllPlots] = useState<PlotTypes[]>([]);
    //const [updateRowFormData, setUpdateRowFormData] = useState<UpdateSiteBodyTypes>({siteID:"", baseSize:0, noOfPlots:0});
    const [isUpdateSiteFormActive, setIsUpdateSiteFormActive] = useState<boolean>(false);
    const [isPlotTooltipVisible, setIsPlotTooltipVisible] = useState<boolean>(false);
    const [totalSiteCalculations, setTotalSiteCalculations] = useState<{totalSoldArea:number; totalRemainingArea:number; totalShouldPay:number; totalPaid:number; totalPending:number;}>({totalSoldArea:0, totalRemainingArea:0, totalShouldPay:0, totalPaid:0, totalPending:0});
    const [updateSiteForm, setUpdateSiteForm] = useState<UpdateSiteBodyTypes>({siteID:"", soldArea:0, totalSize:0});
    //const [aa, setAa] = useState<{}>({});
    const [siteMapForm, setSiteMapForm] = useState<{size:number; rate:number; length:number; breath:number; duration:number; firstPlotNo:number; quantity:number;}>({size:0, rate:0, length:0, breath:0, duration:0, firstPlotNo:0, quantity:0});
    const [siteMapePlots, setSiteMapPlots] = useState<{plotID?:string; size:number; plotNo:number; rate:number; length:number; breath:number; duration:number; x:number; y:number;}[]>([]);
    const parentContRef = useRef<HTMLDivElement|null>(null);
    const selectedPlotIndex = useRef<number|null>(null);
    const [selectedPlot, setSelectedPlot] = useState<{plotID?:string; size:number; plotNo:number; rate:number; length:number; breath:number; duration:number; x:number; y:number; isDragging:boolean; hasSold:boolean;}>({plotID:undefined, plotNo:0, size:0, rate:0, length:0, breath:0, duration:0, x:0, y:0, isDragging:false, hasSold:false});
    const [offset, setOffset] = useState<{x:number; y:number;}>({x:0, y:0});
    
    const firstPlotNoRef = useRef<HTMLInputElement|null>(null);
    const sizeRef = useRef<HTMLInputElement|null>(null);
    const rateRef = useRef<HTMLInputElement|null>(null);
    const lengthRef = useRef<HTMLInputElement|null>(null);
    const breathRef = useRef<HTMLInputElement|null>(null);
    const durationRef = useRef<HTMLInputElement|null>(null);
    const quantityRef = useRef<HTMLInputElement|null>(null);
    const [updateingPlots, setUpdateingPlots] = useState<{plotID?:string; plotNo:number; length:number; breath:number; x:number; y:number;}[]>([]);
    const [isUpdateMapMode, setIsUpdateMapMode] = useState<boolean>(true);
    const [isCreateMapMode, setIsCreateMapMode] = useState<boolean>(true);



    //const [plotBoxTooltip, set]
    const navigate = useNavigate();

    const siteID = query.get("siteID");


    //const updateUI = () => {
    //    const no_of_plots = noOfPlots.current;
    //    const last_plot_no = lastPlotNo.current;
    //    const base_size = baseSize.current;

    //    if (!no_of_plots || !last_plot_no || !base_size) return;

    //    no_of_plots.value = "";
    //    last_plot_no.value = "";
    //    base_size.value = "";
    //    setUpdateRowFormData({...updateRowFormData, baseSize:0, lastPlotNo:0, noOfPlots:0});
    //}

    const navigateToSinglePageHandler = (plotID:string) => {
        navigate(`/single-plot?plotID=${plotID}`);
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
        
    const changeSiteMapFormHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setSiteMapForm({...siteMapForm, [e.target.name]:Number(e.target.value)});
    }
    const addPlotBoxesToMap = () => {
        console.log({siteMapForm});
        for (let x=0; x<siteMapForm.quantity; x++){
            if (siteMapePlots.find((plt) => plt.plotNo === Number(siteMapForm.firstPlotNo)+x)) {
                toast.error(`Plot no ${Number(siteMapForm.firstPlotNo)+x} has already added`)
                return;
            }
            setSiteMapPlots((prev) => [
                //...allPlots.map((plt) => ({
                //    plotID:undefined,
                //    plotNo:plt.plotNo,
                //    size:plt.size,
                //    rate:plt.rate,
                //    length:plt.length,
                //    breath:plt.breath,
                //    duration:plt.duration,
                //    x:plt.coordinates.x,
                //    y:plt.coordinates.y
                //})),
                 ...prev,
                {
                    plotID:undefined,
                    plotNo:Number(siteMapForm.firstPlotNo)+x,
                    size:Number(siteMapForm.size),
                    rate:Number(siteMapForm.rate),
                    length:Number(siteMapForm.length),
                    breath:Number(siteMapForm.breath),
                    duration:Number(siteMapForm.duration),
                    x:100,
                    y:100
                }
            ]);
        }
        setIsCreateMapMode(true);
        setIsUpdateMapMode(false);
        console.log(siteMapePlots);
    }
    const createPlotsHanlder = async() => {
        for(const plt of siteMapePlots){
            const res = await createPlots({
                plotNo:plt.plotNo,
                size:plt.size,
                rate:plt.rate,
                length:plt.length,
                breath:plt.breath,
                site:siteData.siteName,
                duration:plt.duration,
                x:plt.x, y:plt.y
            });

            if (res.success) {
                setAllPlots((prev) => [...prev, res.jsonData]);
                setSiteMapPlots([]);
                setSiteMapForm({
                    firstPlotNo:0,
                    size:0,
                    rate:0,
                    quantity:0,
                    length:0,
                    breath:0,
                    duration:0
                });
                if (!firstPlotNoRef.current ||
                    !sizeRef.current ||
                    !rateRef.current ||
                    !lengthRef.current ||
                    !breathRef.current ||
                    !durationRef.current ||
                    !quantityRef.current) return;

                firstPlotNoRef.current.value = "";
                sizeRef.current.value = "";
                rateRef.current.value = "";
                lengthRef.current.value = "";
                breathRef.current.value = "";
                durationRef.current.value = "";
                quantityRef.current.value = "";
            }
        }
        console.log(siteMapePlots);
    }

    const dragStartHandler = (e:DragEvent<HTMLDivElement>, index:number) => {
        const parentCont = parentContRef.current?.getBoundingClientRect();
        if (!parentCont) return;
        selectedPlotIndex.current = index;
        const mouseX = e.clientX - parentCont.left;
        const mouseY = e.clientY - parentCont.top;

        const targetPlot = siteMapePlots[index];

        setOffset({
            x:mouseX - targetPlot.x,
            y:mouseY - targetPlot.y
        });
        setSelectedPlot({
            plotID:targetPlot.plotID,
            size:targetPlot.size,
            plotNo:targetPlot.plotNo,
            rate:targetPlot.rate,
            length:targetPlot.length,
            breath:targetPlot.breath,
            duration:targetPlot.duration,
            x:targetPlot.x,
            y:targetPlot.y,
            isDragging:true,
            hasSold:false
        });
    }
    const dragHandler = (e:DragEvent<HTMLDivElement>) => {
        const parentCont = parentContRef.current?.getBoundingClientRect();
        if (!parentCont) return;
        const mouseX = e.clientX - parentCont.left;
        const mouseY = e.clientY - parentCont.top;

        setSelectedPlot((prev) => ({
            ...prev,
            x:mouseX-offset.x,
            y:mouseY-offset.y
        }));
    }
    const dropHandler = () => {
        if (selectedPlotIndex.current === null) return;

        const newPlots = [...siteMapePlots];

        newPlots[selectedPlotIndex.current] = {
            ...newPlots[selectedPlotIndex.current],
            x:selectedPlot.x,
            y:selectedPlot.y
        }

        setUpdateingPlots((prev) => [...prev, selectedPlot]);

        setSiteMapPlots(newPlots);
        selectedPlotIndex.current = null;
        setSelectedPlot({
            plotID:undefined,
            plotNo:0,
            size:0,
            rate:0,
            length:0,
            breath:0,
            duration:0,
            x:0,
            y:0,
            isDragging:false,
            hasSold:false
        });
    }

    const handleClick = (e:MouseEvent<HTMLDivElement>) => {
        const target = (e.target as HTMLElement);
    
        if (target.dataset.type === 'item') {
          console.log(target.id);
          const selectedPlt = allPlots.find((plt) => plt._id === target.id);
          if (!selectedPlt) return;

          setIsPlotTooltipVisible(true);
          setSelectedPlot({
            plotID:selectedPlt._id,
            plotNo:selectedPlt?.plotNo,
            size:selectedPlt?.size,
            rate:selectedPlt?.rate,
            length:selectedPlt?.length,
            breath:selectedPlt?.breath,
            duration:selectedPlt?.duration,
            x:selectedPlt?.coordinates.x,
            y:selectedPlt?.coordinates.y,
            isDragging:false,
            hasSold:selectedPlt.hasSold
          });
        }
        else{
            setIsPlotTooltipVisible(false);
            setSelectedPlot({
                plotID:undefined,
                plotNo:0,
                size:0,
                rate:0,
                length:0,
                breath:0,
                duration:0,
                x:0,
                y:0,
                isDragging:false,
                hasSold:false
            });
        }
    };

    const aaaaa = () => {
        const as = allPlots.map((plt) => ({
            plotID:plt._id,
            plotNo:plt.plotNo,
            size:plt.size,
            rate:plt.rate,
            length:plt.length,
            breath:plt.breath,
            duration:plt.duration,
            x:plt.coordinates.x,
            y:plt.coordinates.y,
            isDragging:false,
            hasSold:plt.hasSold            
        }));
        setSiteMapPlots(as);
        setIsCreateMapMode(false);
    }
    
    const bbbbb = async() => {

        for(let i=0; i<updateingPlots.length; i++){
            if (updateingPlots.length === 0) return;
            if (updateingPlots[i].plotID) {
                const res = await updatePlotCoordinates({
                    plotID:updateingPlots[i].plotID as string,
                    x:updateingPlots[i].x,
                    y:updateingPlots[i].y
                });
                console.log(res.jsonData);

                if (res.success) {
                    //const plotsWithNewPosition = allPlots.filter((plt) => plt.plotNo !== res.jsonData.plotNo);
                    const plotsWithNewPosition = allPlots.map((plt) => {
                        if (plt.plotNo === res.jsonData.plotNo) {
                            return {...plt, coordinates:{x:res.jsonData.coordinates.x, y:res.jsonData.coordinates.y}}
                        }
                        else{
                            return plt;
                        }
                    });
    
                    setAllPlots(plotsWithNewPosition);
                    setSiteMapPlots([]);
                    setUpdateingPlots([]);
                    selectedPlotIndex.current = null;
                    
                    console.log({plotsWithNewPosition});
                    
                }
                else{
                    console.log("error occured line 324 SingleSite.tsx");
                }

                
            }
            else{
                console.log(updateingPlots[i].plotID, "is undefined");
                
            }
        }
        console.log(siteMapePlots);
        console.log(updateingPlots);

    }

    const cancelPositionUpdate = () => {
        setUpdateingPlots([]);
        setSelectedPlot({
            plotID:undefined,
            plotNo:0,
            size:0,
            rate:0,
            length:0,
            breath:0,
            duration:0,
            x:0,
            y:0,
            isDragging:false,
            hasSold:false
        });
        setSiteMapPlots([]);
        setIsCreateMapMode(true);
        setIsUpdateMapMode(true);
        selectedPlotIndex.current = null;
    }
    

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

    }, [siteData, siteID]);

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
            <KeyValuePairs keyValuePairArray={[
                {"Total Area":siteData?.totalSize},
                {"Sold Area":totalSiteCalculations.totalSoldArea},
                {"Remaining Area":totalSiteCalculations.totalRemainingArea.toPrecision(5)},
            ]} margin="10px auto"
            />
            <KeyValuePairs keyValuePairArray={[
                {"Should Pay":totalSiteCalculations.totalShouldPay},
                {"Paid":totalSiteCalculations.totalPaid},
                {"Total Pendings":totalSiteCalculations.totalPending},
            ]} margin="10px auto" backgroundColor={PRIMARY_LIGHT} />




            {
                isCreateMapMode &&
                    <div style={{
                        textAlign:"center"
                    }}>
                        <input className="primary_input" ref={firstPlotNoRef} type="text" name="firstPlotNo" placeholder="Starting Plot No." onChange={changeSiteMapFormHandler} />
                        <input className="primary_input" ref={sizeRef} type="text" name="size" placeholder="Base Size" onChange={changeSiteMapFormHandler} />
                        <input className="primary_input" ref={rateRef} type="text" name="rate" placeholder="Rate" onChange={changeSiteMapFormHandler} />
                        <input className="primary_input" ref={lengthRef} type="text" name="length" placeholder="Length" onChange={changeSiteMapFormHandler} />
                        <input className="primary_input" ref={breathRef} type="text" name="breath" placeholder="Breath" onChange={changeSiteMapFormHandler} />
                        <input className="primary_input" ref={durationRef} type="text" name="duration" placeholder="Duration" onChange={changeSiteMapFormHandler} />
                        <input className="primary_input" ref={quantityRef} type="text" name="quantity" placeholder="Quantity" onChange={changeSiteMapFormHandler} />
                        <ButtonPrimary
                            text="Add To Map"
                            Icon={LuMapPinCheck}
                            onClickHandler={addPlotBoxesToMap}
                            display="inline-flex"
                        />
                    </div>
            }

            {isCreateMapMode&&siteMapePlots.length !== 0 && 
                <ButtonPrimary
                    text="Create Plots"
                    Icon={BiAddToQueue}
                    onClickHandler={createPlotsHanlder}
                    display="inline-flex"
                />
            }

            {
                isUpdateMapMode &&
                //!isCreateMapMode &&
                <>
                    {   allPlots.length !== 0 &&
                        <ButtonPrimary
                            text="Update Plot Position"
                            Icon={updateingPlots.length === 0 ? LuGrab : RxCross1}
                            onClickHandler={updateingPlots.length === 0 ? aaaaa : cancelPositionUpdate}
                            display="inline-flex"
                        />
                    }
                    {
                        updateingPlots.length !== 0 &&
                            <ButtonPrimary
                                text="Save New Position"
                                Icon={VscGitPullRequestCreate}
                                onClickHandler={bbbbb}
                                display="inline-flex"
                            />
                    }
                </>
            }
            <ScrollableContainer>
                <div className="parent_cont" ref={parentContRef}
                    onDragOver={(e) => {
                        e.preventDefault();
                        dragHandler(e);
                    }}
                    onDrop={dropHandler}
                    style={{
                        height:"400px",
                        width:"1220px",
                        position:"relative"
                    }}
                    onClick={(e) => handleClick(e)}
                >

                    {
                        siteMapePlots.map((plt, index) => (
                            <div className="plot"
                                key={plt.plotNo}
                                draggable
                                onDragStart={(e) => dragStartHandler(e, index)}
                                onDragEnd={dropHandler}
                                style={{
                                    position:"absolute",
                                    top:plt.y,
                                    left:plt.x,
                                    backgroundColor:"blue",
                                    padding:`${plt.length}px ${plt.breath}px`,
                                    fontSize:"0.6rem",
                                    height:`${plt.length}px`,
                                    width:`${plt.breath}px`,
                                    cursor: "grab",
                                    userSelect: "none",
                                    zIndex:2
                                }}
                            >
                                {plt.plotNo}
                            </div>
                        ))
                    }

                    {
                        //siteMapePlots.length === 0 &&
                        allPlots.map((plt) => (
                            <div className="plot"
                                id={plt._id}
                                data-type="item"
                                key={plt._id}
                                style={{
                                    position:"absolute",
                                    top:plt.coordinates.y,
                                    left:plt.coordinates.x,
                                    backgroundColor:plt.hasSold?"green":"red",
                                    padding:`${plt.length}px ${plt.breath}px`,
                                    height:`${plt.length}px`,
                                    width:`${plt.breath}px`,
                                    fontSize:"0.6rem",
                                    textAlign:"center",
                                    alignContent:"center",
                                    display:"flex",
                                    flexDirection:"column",
                                    opacity:selectedPlot.plotNo === plt.plotNo?"0.5":"1"
                                }}
                            >
                                {plt.plotNo} <br/>
                                {plt.size}
                            </div>
                        ))
                    }

                    {selectedPlot.isDragging && (
                        <div
                        className="tooltip"
                        style={{
                            position:"absolute",
                            top: selectedPlot.y,
                            left: selectedPlot.x+40
                        }}
                        >
                        {selectedPlot.plotNo} – ({Math.round(selectedPlot.x)},{Math.round(selectedPlot.y)})
                        </div>
                    )}
                    {isPlotTooltipVisible && (
                        <div
                        className="plot_options_dropdown"
                        style={{
                            position:"absolute",
                            top: selectedPlot.y,
                            left: selectedPlot.x+40
                        }}
                        >
                        <KeyValuePairs
                            keyValuePairArray={[
                                {"PlotNo":selectedPlot.plotNo},
                                {"Size":selectedPlot.size},
                                {"BaseRate":selectedPlot.rate},
                                {...(selectedPlot.hasSold ?
                                        ({
                                            "Info":<ButtonPrimary
                                                    text="Info"
                                                    Icon={ImInfo}
                                                    onClickHandler={() => navigateToSinglePageHandler(selectedPlot?.plotID as string)}
                                                />
                                        })
                                        :
                                        ({
                                            "Sell":<ButtonPrimary
                                                    text="Sell"
                                                    Icon={MdSell}
                                                    onClickHandler={() => navigate(`/create?plotID=${selectedPlot.plotID}&plotStatus=vacant&size=${selectedPlot.size}&length=${selectedPlot.length}&breath=${selectedPlot.breath}&formPanelFor=slips`)}
                                                />
                                        })
                                )}
                            ]}
                            width="100px"
                        />
                        </div>
                    )}
                </div>
            </ScrollableContainer>







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
                            heading="No Plots"
                            para="Plots will be shown here"
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