import { useState } from "react";
import { findAllClients } from "../api";


const Clients = () => {
    const [allClients, setAllClients] = useState([]);

    return(
        <div className="clients_bg">
            <h1>Clients</h1>
            {JSON.stringify(allClients)}
            <button onClick={findAllClients}>fetch</button>
        </div>
    )
};

export default Clients;