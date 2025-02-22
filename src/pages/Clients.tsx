import "../styles/pages/client.scss";
import { useEffect, useState } from "react";
import { findAllClients } from "../api";
import { ClientTableTransformedTypes } from "../utils/types";
import Table from "../shared/Table";


const Clients = () => {
    const [allClientsData, setAllClientsData] = useState<ClientTableTransformedTypes[]>([]);

    useEffect(() => {
        findAllClients()
        .then((data) => {
            setAllClientsData(data.jsonData);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
    
    return(
        <div className="clients_bg">
            <h1>Clients</h1>
            <Table data={allClientsData} />
            {/*<pre>{JSON.stringify(allClientsData, null, `\t`)}</pre>*/}
        </div>
    )
};

export default Clients;