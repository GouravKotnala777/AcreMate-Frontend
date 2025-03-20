import "../styles/pages/home.scss";
import { useState } from "react";
import { PlotTypes } from "../utils/types";
import { PRIMARY_LIGHT } from "../utils/constants";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";



const Home = () => {
    const [allAgentsData, setAllAgentsData] = useState<(PlotTypes&{agentName:string; soldArea:number;})[]>([]);


    return(
        <div className="home_bg">
            <h1>Home</h1>
        </div>
    )
};

export default Home;