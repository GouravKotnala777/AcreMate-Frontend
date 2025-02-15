import { useState } from "react";
import { findAllUsers } from "../api";


const Home = () => {
    const [allUsers, setAllUsers] = useState([]);

    return(
        <div className="home_bg">
            <h1>Home</h1>
            {JSON.stringify(allUsers)}
            <button onClick={findAllUsers}>fetch</button>
        </div>
    )
};

export default Home;