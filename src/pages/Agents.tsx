import "../styles/pages/agents.scss";


const Agents = () => {
    //const [allAgentsData, setAllAgentsData] = useState<UserTypes[]>([]);


    {
        //useEffect(() => {
        //    findAllAgents()
        //    .then((data) => {
        //        setAllAgentsData(data.jsonData);
        //    })
        //    .catch((err) => {
        //        console.log(err);
        //    })
        //}, []);

    }



    return(
        <div className="agents_bg">
            <h1>Agents</h1>
            {/*<pre style={{fontSize:"8px"}}>{JSON.stringify(tooltip, null, `\t`)}</pre>*/}
            {/*<pre style={{fontSize:"8px"}}>{JSON.stringify(isTooltipVisible, null, `\t`)}</pre>*/}
            {/*<button onClick={getHighestAmount}>Calculate</button>*/}
        </div>
    )
};

export default Agents;