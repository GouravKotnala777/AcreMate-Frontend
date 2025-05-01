import "../styles/components/header.component.scss";
import { ButtonPrimary, NavigateItem } from "../shared/SharedComponents";
import logo from "/public/acremate_logo6.png";
import { BiCross } from "react-icons/bi";
import { NavLink } from "react-router-dom";
//import Spinner from "./Spinner";
//import { FONT_PRIMARY } from "../utils/constants";
import { useState } from "react";
//import { getSearchedSuggesstions } from "../api";
//import { ClientTypes, PlotTypes, SlipTypes } from "../utils/types";
//import { CgRemove } from "react-icons/cg";
import SearchComponent from "./SearchComponent";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { LuLandPlot } from "react-icons/lu";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { CiMemoPad } from "react-icons/ci";
import { HiOutlineLogin } from "react-icons/hi";

//let timerID:number|null = null;
const Header = () => {
    //const [isSuggessionActive, setIsSuggessionActive] = useState<boolean>(false);
    
    //const [searchQuery, setSearchQuery] = useState<string>("");
    //const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSearchPanelMobileActive, setIsSearchPanelMobileActive] = useState<boolean>(false);
    const [isHamActive, setIsHamActive] = useState<boolean>(false);
    //const [isSearchInpFocused, setIsSearchInpFocused] = useState<boolean>(false);
    //const [suggesstions, setSuggesstions] = useState<{
    //        allClientsOfName:ClientTypes[];
    //        allClientsOfGuardianName:ClientTypes[];
    //        allClientsOfSearialNo:ClientTypes[];
    //        allPlots:PlotTypes[];
    //        allSlips:SlipTypes[];
    //        allNefts:SlipTypes[];
    //        allDrafts:SlipTypes[];
    //    }>({
    //        allClientsOfName:[],
    //        allClientsOfGuardianName:[],
    //        allClientsOfSearialNo:[],
    //        allPlots:[],
    //        allSlips:[],
    //        allNefts:[],
    //        allDrafts:[]
    //    });
    //const navigate = useNavigate();
    //const overlayRef = useRef<HTMLDivElement|null>(null);
    //const searchInpRef = useRef<HTMLInputElement|null>(null);
    //const searchInpContRef = useRef<HTMLDivElement|null>(null);


    //const undoSearchHandler = () => {
    //    setSearchQuery("");
    //    setIsLoading(false);
    //    setIsSearchInpFocused(false);
    //    setIsSuggessionActive(false);
    //    setSuggesstions({
    //        allClientsOfName:[],
    //        allClientsOfGuardianName:[],
    //        allClientsOfSearialNo:[],
    //        allPlots:[],
    //        allSlips:[],
    //        allNefts:[],
    //        allDrafts:[]
    //    });
    //}

    //const searchHandler = async(e:ChangeEvent<HTMLInputElement>) => {
    //    if (e.target.value.trim() !== "") {
    //        if (e.target.value.trim() !== searchQuery) {
    //            setIsLoading(true);
    //            //setIsSearchInpFocused(true);
    //            setSearchQuery(e.target.value.trim());   
    //        }
    //    }
    //    else{
    //        undoSearchHandler();
    //        setIsSearchInpFocused(true);
    //    }
    //}

    //const navigateThroughSuggesstion = (url:string) => {
    //    navigate(url);
    //    undoSearchHandler();
    //    blurHandler();
    //}
    //const blurHandler = () => {
    //    const overlay = overlayRef.current;
    //    if (!overlay) {
    //        alert(`${overlay} aaaaaaaaaaaaaaa`);
    //        return;
    //    }
    //    overlay.style.display = "none";

    //    const searchInpCont = searchInpContRef.current
    //    if (!searchInpCont) return;
    //    searchInpCont.style.zIndex = "1";


    //    undoSearchHandler();
    //    //setIsSearchInpFocused(false);
    //}
    //const searchPanelActiveHandler = () => {

    //}
    //const focusHandler = () => {
    //    const overlay = overlayRef.current;
    //    if (!overlay) return;
    //    overlay.style.display = "block";
    //    overlay.style.zIndex = "2";
    //    setIsSearchInpFocused(true);
    //}

    //useEffect(() => {
    //    //setIsLoading(true);

    //    if (searchQuery.trim() === "") {
    //        return;
    //    }
        
    //    timerID = setTimeout(() => {
    //        setIsLoading(false);
    //        setIsSuggessionActive(true);
    //        getSearchedSuggesstions({searchQuery})
    //        .then((data) => {
    //            if (data.success) {
    //                setSuggesstions(data.jsonData);
    //            }
    //        })
    //        .catch((err) => {
    //            console.log(err);
    //        });
    //    }, 2000);

    //    return() => {
    //        if (timerID) {
    //            clearTimeout(timerID);
    //        }
    //    }

    //}, [searchQuery]);

    return(
        <>
        <header className="header_cont">
            <NavLink to="/home" className="logo">
                <img src={logo} alt={logo} />
            </NavLink>
            <div className="search_cont_outer">
                <SearchComponent
                    setIsSearchPanelMobileActive={setIsSearchPanelMobileActive}
                />
            </div>
            <button className="search_cont_mobile" onClick={() => setIsSearchPanelMobileActive(true)}>
                <FaMagnifyingGlass />
            </button>
            <div className="search_panel_mobile" style={{
                display:isSearchPanelMobileActive?"block":"none"
            }}>
                <ButtonPrimary
                    text="Back"
                    Icon={BiCross}
                    onClickHandler={() => setIsSearchPanelMobileActive(false)}
                    display="inline-flex"
                    margin="10px 0px"
                />
                
                <SearchComponent
                    setIsSearchPanelMobileActive={setIsSearchPanelMobileActive}
                />
            </div>
            <nav className="nav">
                <NavigateItem Icon={LuLandPlot} text={"Sites" as "sites"} url="/sites" />
                <div className="nav_item_blocks">
                    <NavigateItem Icon={MdOutlineRealEstateAgent} text={"Agents" as "agents"} url="/agents" />
                    <NavigateItem Icon={CiMemoPad} text={"Slips" as "slips"} url="/slips"/>
                    <NavigateItem Icon={HiOutlineLogin} text={"Login" as "login"} url="/login"/>
                </div>
            </nav>
            <div className="ham_nav_cont">
                <button className="ham_toggler" onClick={() => setIsHamActive(!isHamActive)}>
                    <div className="ham_line"></div>
                    <div className="ham_line"></div>
                    <div className="ham_line"></div>
                </button>
                <div className="ham_nav_side_panel_closer"
                    onClick={() => setIsHamActive(false)}
                    style={{
                        left:isHamActive?"0":"-100vw"
                    }}
                >
                    <div className="ham_nav_side_panel">
                        <div className="ham_nav_items">
                            <NavLink to="/home" className="ham_nav_item">
                                Home
                            </NavLink>
                            <NavLink to="/agents" className="ham_nav_item">
                                Agents
                            </NavLink>
                            <NavLink to="/sites" className="ham_nav_item">
                                All Sites
                            </NavLink>
                            <NavLink to="/slips" className="ham_nav_item">
                                All Slips
                            </NavLink>
                            <NavLink to="/create?plotID=''&plotStatus=''&formPanelFor=sites" className="ham_nav_item">
                                Create Site
                            </NavLink>
                            <NavLink to="/register" className="ham_nav_item">
                                Register
                            </NavLink>
                            <NavLink to="/login" className="ham_nav_item">
                                Login
                            </NavLink>
                            <NavLink to="/logout" className="ham_nav_item">
                                Logout
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

        </header>
        </>
    )
};

export default Header;