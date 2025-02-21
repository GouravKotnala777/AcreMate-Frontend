import { useEffect, useState } from "react";
import "../styles/pages/agents.scss";
import { findAllAgents } from "../api";
import { UserTypes } from "../utils/types";
import Table from "../shared/Table";

const Agents = () => {
    const [allAgentsData, setAllAgentsData] = useState<UserTypes[]>([]);
    

    useEffect(() => {
        findAllAgents()
        .then((data) => {
            setAllAgentsData(data.jsonData);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    return(
        <div className="agents_bg">
            <h1>Agents</h1>
            <Table data={allAgentsData} />
            {/*<pre>{JSON.stringify(allAgentsData, null, `\t`)}</pre>*/}
        </div>
    )
};

export default Agents;