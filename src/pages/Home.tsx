import { useEffect, useState } from "react";
import { agentsAndSoldArea } from "../api";
import { PlotTypes } from "../utils/types";


const Home = () => {
    const [allAgentsData, setAllAgentsData] = useState<PlotTypes[]>([]);
    

    useEffect(() => {
        agentsAndSoldArea()
        .then((data) => {
            setAllAgentsData(data.jsonData);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    return(
        <div className="home_bg">
            <h1>Home</h1>
            <pre>{JSON.stringify(allAgentsData, null, `\t`)}</pre>
        </div>
    )
};

export default Home;