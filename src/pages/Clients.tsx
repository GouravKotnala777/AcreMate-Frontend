import "../styles/pages/client.scss";
import { useEffect, useState } from "react";
import { findAllClients } from "../api";
import { ClientTableTransformedTypes } from "../types";
import Table from "../shared/Table";

const clientDummyData = [
    {_id:"A", serialNumber:1,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:2,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:3,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:4,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:5,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:6,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:7,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:8,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:9,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:10,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:11,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:12,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:13,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:14,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:15,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:16,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:17,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:18,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:19,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
    {_id:"A", serialNumber:20,name:"naruto", email:"naruto@gmail.com",gender:"male",mobile:"08882732859",guardian:"minato",ownerShipStatus:"pending",createdAt:"2025-02-15T07:37:49.405Z"},
]

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
            <Table data={clientDummyData} />
            {/*<pre>{JSON.stringify(allClientsData, null, `\t`)}</pre>*/}
        </div>
    )
};

export default Clients;