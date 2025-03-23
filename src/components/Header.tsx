import "../styles/components/header.component.scss";
import { BsPerson } from "react-icons/bs";
import { NavigateItem } from "../shared/SharedComponents";
import logo from "/public/acremate_logo6.png";
import { BiRegistered } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { GiSlipknot } from "react-icons/gi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Spinner from "./Spinner";
import { FONT_PRIMARY } from "../utils/constants";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { getSearchedSuggesstions } from "../api";
import { ClientTypes, PlotTypes, SlipTypes } from "../utils/types";
import { CgRemove } from "react-icons/cg";

let timerID:number|null = null;
const Header = () => {
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
        }>({
            allClientsOfName:[],
            allClientsOfGuardianName:[],
            allClientsOfSearialNo:[],
            allPlots:[],
            allSlips:[]
        });
    const navigate = useNavigate();
    const overlayRef = useRef<HTMLDivElement|null>(null);


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
                allSlips:[]
            });
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
        }
    }

    const navigateThroughSuggesstion = (url:string) => {
        navigate(url);
        undoSearchHandler();
        blurHandler();
    }
    const blurHandler = () => {
        const overlay = overlayRef.current;
        if (!overlay) {
            alert(`${overlay} aaaaaaaaaaaaaaa`);
            return;
        }
        overlay.style.display = "none";
        undoSearchHandler();
        //setIsSearchInpFocused(false);
    }
    const focusHandler = () => {
        const overlay = overlayRef.current;
        if (!overlay) return;
        overlay.style.display = "block";
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
                    setSuggesstions(data.jsonData)
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
        <header className="header_cont">
            <NavLink to="/home" className="logo">
                <img src={logo} alt={logo} />
            </NavLink>
            <div className="search_cont">
                <div className="search_icon"><FaMagnifyingGlass /></div>
                <input type="text" name="search" className="search_inp" value={searchQuery}
                    onChange={(e) => searchHandler(e)}
                    onFocus={focusHandler}
                />
                
                {
                    !isSearchInpFocused &&
                        <div className="placeholder_animation_cont">
                            {
                                ["Client Name", "Client Guardian Name", "Client Serial Number", "Plot Number", "Slip Number"].map((str, ind) => (
                                    <div id={`placeholder_value-${ind}`} className={`placeholder_value-${ind} value`} key={str} onClick={focusHandler}>{str}</div>
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
                            <button className="undo_search_btn" onClick={() => undoSearchHandler()}><CgRemove /></button>
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
                </div>
            </div>
            <div className="overlay"
                ref={overlayRef}
                onClick={blurHandler}
            ></div>
            <nav className="nav">
                <NavigateItem Icon={BsPerson} text={"Agents" as "agents"} url="/agents" />
                <NavigateItem Icon={GiSlipknot} text={"Slips" as "slips"} url="/slips"/>
                <NavigateItem Icon={BiRegistered} text={"Login" as "login"} url="/login"/>
                {/*<NavigateItem Icon={BsPersonCheck} text={"Clients" as "clients"} url="/clients" setSelectedRouteHandler={setSelectedRouteHandler} />
                <NavigateItem Icon={BsPersonDown} text={"Plots" as "plots"} url="/plots" setSelectedRouteHandler={setSelectedRouteHandler} />
                <NavigateItem Icon={BiGrid} text={"Sites" as "sites"} url="/sites" setSelectedRouteHandler={setSelectedRouteHandler} />
                <NavigateItem Icon={BiLogIn} text={"Register" as "register"} url="/register" setSelectedRouteHandler={setSelectedRouteHandler} />
                <NavigateItem Icon={BiUser} text={"Me" as "me"} url="/me" setSelectedRouteHandler={setSelectedRouteHandler} />*/}
            </nav>
        </header>
        </>
    )
};

export default Header;