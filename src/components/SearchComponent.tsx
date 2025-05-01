import "../styles/components/search_component.scss";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ClientTypes, PlotTypes, SlipTypes } from "../utils/types";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { FONT_PRIMARY } from "../utils/constants";
import { getSearchedSuggesstions } from "../api";
import { HeadingParaCont } from "../shared/SharedComponents";
import { TbSearch } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";



let timerID:number|null = null;
const SearchComponent = ({setIsSearchPanelMobileActive}:{setIsSearchPanelMobileActive:Dispatch<SetStateAction<boolean>>}) => {
    const [isSuggessionActive, setIsSuggessionActive] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSearchInpFocused, setIsSearchInpFocused] = useState<boolean>(false);
    const [suggesstions, setSuggesstions] = useState<{
            allClientsOfName:ClientTypes[];
            allClientsOfGuardianName:ClientTypes[];
            allClientsOfSearialNo:ClientTypes[];
            allPlots:PlotTypes[];
            allSlips:SlipTypes[];
            allNefts:SlipTypes[];
            allDrafts:SlipTypes[];
        }>({
            allClientsOfName:[],
            allClientsOfGuardianName:[],
            allClientsOfSearialNo:[],
            allPlots:[],
            allSlips:[],
            allNefts:[],
            allDrafts:[]
        });
    const navigate = useNavigate();
    const overlayRef = useRef<HTMLDivElement|null>(null);
    const searchInpRef = useRef<HTMLInputElement|null>(null);
    const searchInpContRef = useRef<HTMLDivElement|null>(null);


    
    const undoSearchHandler = () => {
        setSearchQuery("");
        setIsLoading(false);
        setIsSearchInpFocused(false);
        setIsSuggessionActive(false);
        setSuggesstions({
            allClientsOfName:[],
            allClientsOfGuardianName:[],
            allClientsOfSearialNo:[],
            allPlots:[],
            allSlips:[],
            allNefts:[],
            allDrafts:[]
        });
        setIsSearchPanelMobileActive(false);
        
    }

    const searchHandler = async(e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim() !== "") {
            if (e.target.value.trim() !== searchQuery) {
                setIsLoading(true);
                //setIsSearchInpFocused(true);
                setSearchQuery(e.target.value.trim());   
            }
        }
        else{
            undoSearchHandler();
            setIsSearchInpFocused(true);
        }
    }

    const navigateThroughSuggesstion = (url:string) => {
        navigate(url);
        undoSearchHandler();
        blurHandler();
    }
    const blurHandler = () => {
        const overlay = overlayRef?.current;
        if (!overlay) {
            alert(`${overlay} aaaaaaaaaaaaaaa`);
            return;
        }
        overlay.style.display = "none";

        const searchInpCont = searchInpContRef?.current
        if (!searchInpCont) return;
        searchInpCont.style.zIndex = "1";


        undoSearchHandler();
        //setIsSearchInpFocused(false);
    }
    //const searchPanelActiveHandler = () => {

    //}
    const focusHandler = () => {
        const overlay = overlayRef?.current;
        if (!overlay) return;        
        overlay.style.display = "block";
        overlay.style.zIndex = "2";
        setIsSearchInpFocused(true);
    }

    useEffect(() => {
        //setIsLoading(true);

        if (searchQuery.trim() === "") {
            return;
        }
        
        timerID = setTimeout(() => {
            setIsLoading(false);
            setIsSuggessionActive(true);
            getSearchedSuggesstions({searchQuery})
            .then((data) => {
                if (data.success) {
                    setSuggesstions(data.jsonData);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }, 2000);

        return() => {
            if (timerID) {
                clearTimeout(timerID);
            }
        }

    }, [searchQuery]);


    return(
        <>
            <div className="search_cont" ref={searchInpContRef}>
                <div className="search_icon"><TbSearch /></div>
                <input ref={searchInpRef} type="text" name="search" className="search_inp" value={searchQuery}
                    onChange={(e) => searchHandler(e)}
                    onFocus={() => {
                        focusHandler();
                        console.log("aaaaaaaaaaaa");
                        
                        const searchInpCont = searchInpContRef?.current
                        if (!searchInpCont) return;
                        searchInpCont.style.zIndex = "3";
                    }}
                />
                
                {
                    !isSearchInpFocused &&
                        <div className="placeholder_animation_cont">
                            {
                                ["Client Name", "Client Guardian Name", "Client Serial Number", "Plot Number", "Slip Number"].map((str, ind) => (
                                    <div id={`placeholder_value-${ind}`} className={`placeholder_value-${ind} value`} key={str} onClick={() => {
                                        focusHandler();
                                        const searchInp = searchInpRef?.current
                                        if (!searchInp) return;
                                        searchInp.focus();
                                    }}>{str}</div>
                                ))
                            }
                        </div>
                }

                <div className="search_icon">
                    {
                        isLoading &&
                            <Spinner width="15px" borderTop={`2px solid ${FONT_PRIMARY}`} />
                    }
                    {
                        !isLoading && searchQuery &&
                            <button className="undo_search_btn" onClick={() => {undoSearchHandler(); setIsSearchInpFocused(true);}}><RxCross1 /></button>
                    }
                </div>
                <div className="suggesstions_cont" style={{
                    transform:isSuggessionActive?`scale(1, 1)`:`scale(1, 0)`
                }}>
                    <div className="suggesstion_section first_section">
                        {
                            suggesstions.allClientsOfName.length !== 0 &&
                                <div className="suggesstion_heading">Clients related search</div>
                        }
                        {
                            suggesstions.allClientsOfName.map((clnt) => (
                                <button className="suggesstion_value" key={clnt._id} onClick={() => navigateThroughSuggesstion(`/single-plot?clientID=${clnt._id}`)}>{clnt.name}</button>
                            ))
                        }
                    </div>
                    <div className="suggesstion_section second_section">
                        {
                            suggesstions.allClientsOfGuardianName.length !== 0 &&
                                <div className="suggesstion_heading">Guardian related search</div>
                        }
                        {
                            suggesstions.allClientsOfGuardianName.map((clnt) => (
                                <button className="suggesstion_value" key={clnt._id} onClick={() => navigateThroughSuggesstion(`/single-plot?clientID=${clnt._id}`)}>{clnt.guardian}</button>
                            ))
                        }
                    </div>
                    <div className="suggesstion_section third_section">
                        {
                            suggesstions.allClientsOfSearialNo.length !== 0 &&
                                <div className="suggesstion_heading">Client Serial related search</div>
                        }
                        {
                            suggesstions.allClientsOfSearialNo.map((clnt) => (
                                <button className="suggesstion_value" key={clnt._id} onClick={() => navigateThroughSuggesstion(`/single-plot?clientID=${clnt._id}`)}>{clnt.serialNumber}</button>
                            ))
                        }
                    </div>
                    <div className="suggesstion_section fourth_section">
                        {
                            suggesstions.allPlots.length !== 0 &&
                                <div className="suggesstion_heading">Plots related search</div>
                        }
                        {
                            suggesstions.allPlots.map((plt) => (
                                <button className="suggesstion_value" key={plt._id} onClick={() => navigateThroughSuggesstion(`/single-plot?plotID=${plt._id}`)}>{plt.plotNo}</button>
                            ))
                        }
                    </div>
                    <div className="suggesstion_section fifth_section">
                        {
                            suggesstions.allSlips.length !== 0 &&
                                <div className="suggesstion_heading">Slips related search</div>
                        }
                        {
                            suggesstions.allSlips.map((slp) => (
                                <button className="suggesstion_value" key={slp._id} onClick={() => navigateThroughSuggesstion(`/single-plot?slipID=${slp._id}`)}>{slp.slipNo}</button>
                            ))
                        }
                    </div>
                    <div className="suggesstion_section sixth_section">
                        {
                            suggesstions.allNefts.length !== 0 &&
                                <div className="suggesstion_heading">NEFT related search</div>
                        }
                        {
                            suggesstions.allNefts.map((slp) => (
                                <button className="suggesstion_value" key={slp._id} onClick={() => navigateThroughSuggesstion(`/single-plot?slipID=${slp._id}`)}>{slp.paymentID}</button>
                            ))
                        }
                    </div>
                    <div className="suggesstion_section seventh_section">
                        {
                            suggesstions.allDrafts.length !== 0 &&
                                <div className="suggesstion_heading">Cheque related search</div>
                        }
                        {
                            suggesstions.allDrafts.map((slp) => (
                                <button className="suggesstion_value" key={slp._id} onClick={() => navigateThroughSuggesstion(`/single-plot?slipID=${slp._id}`)}>{slp.paymentID}</button>
                            ))
                        }
                    </div>
                    <div className="suggesstion_section eight_section">
                        {
                            (
                                suggesstions.allClientsOfName.length === 0 &&
                                suggesstions.allClientsOfGuardianName.length === 0 &&
                                suggesstions.allClientsOfSearialNo.length === 0 &&
                                suggesstions.allDrafts.length === 0 &&
                                suggesstions.allNefts.length === 0 &&
                                suggesstions.allPlots.length === 0 &&
                                suggesstions.allSlips.length === 0
                            )
                            &&
                                <HeadingParaCont
                                    heading="Result not found"
                                    para="No item found for searched query"
                                />
                        }
                    </div>
                </div>
            </div>
            <div className="overlay"
                tabIndex={1}
                ref={overlayRef}
                onClick={blurHandler}
                onKeyDown={(e) => {
                    e.key === "Enter" && blurHandler()
                }}
            ></div>
        </>
    )
}

export default SearchComponent;