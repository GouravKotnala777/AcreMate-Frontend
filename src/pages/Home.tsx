import "../styles/pages/home.scss";
import { useEffect, useState } from "react";
import { agentsAndSoldArea } from "../api";
import { PlotTypes } from "../utils/types";
import { KeyValuePairs } from "../shared/SharedComponents";


const Home = () => {
    const [allAgentsData, setAllAgentsData] = useState<(PlotTypes&{agentName:string; soldArea:number;})[]>([]);
    

    useEffect(() => {
        agentsAndSoldArea()
        .then((data) => {
            console.log(data);
            setAllAgentsData(data.jsonData);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    return(
        <div className="home_bg">
            <h1>Home</h1>
            <div className="agent_data_cont">
                {
                    allAgentsData.map((info, index) => (
                        <div className="agent_data" key={index}>
                            <KeyValuePairs keyValuePairArray={[
                                {"Site Name":info.site},
                                {"Agent Name":info.agentName},
                                {"Sold Area":info.soldArea}
                            ]} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default Home;