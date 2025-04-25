import { useEffect, useState } from "react";
import "../styles/pages/agents.scss";
import { agentsAndSoldArea } from "../api";
import { KeyValuePairs } from "../shared/SharedComponents";
import { PRIMARY_LIGHTER } from "../utils/constants";
//import { PlotTypes } from "../utils/types";

const siteArray = ["jajru (ist)", "jajru (iind)", "sec-58"];

const Agents = () => {
    //const [allAgentsData, setAllAgentsData] = useState<({paid:number; shouldPay:number; agentName:string; soldArea:number; pending:number;})[]>([]);
    const [allAgentsDataTransformed, setAllAgentsDataTransformed] = useState<
        {
            [key:string]:({paid:number; shouldPay:number; agentName:string; soldArea:number; pending:number;})[]
        }
    >({});

    useEffect(() => {
        agentsAndSoldArea()
        .then((data) => {
            //setAllAgentsData(data.jsonData);
            const as = data.jsonData.reduce((obj, plt) => {
                if (obj[plt.site]) {
                    obj[plt.site].push({
                        soldArea:plt.soldArea,
                        shouldPay:plt.shouldPay,
                        paid:plt.paid,
                        pending:plt.pending,
                        agentName:plt.agentName
                    })
                }
                else{
                    obj[plt.site] = [{
                        soldArea:plt.soldArea,
                        shouldPay:plt.shouldPay,
                        paid:plt.paid,
                        pending:plt.pending,
                        agentName:plt.agentName
                    }];
                }
                
                return obj
            }, {} as {[key:string]:({
                    paid:number;
                    shouldPay:number;
                    agentName:string;
                    soldArea:number;
                    pending:number;
                })[]
            })
            setAllAgentsDataTransformed(as)
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);





    return(
        <div className="agents_bg">
            <h1>Agents</h1>

                <div className="site_cont">
                    {
                        siteArray.map((siteName, ind) => (
                            <span key={ind}>
                                
                                <KeyValuePairs
                                    keyValuePairArray={[
                                        {"Site":siteName}
                                    ]}
                                    margin="20px 0 0 0"
                                    backgroundColor={PRIMARY_LIGHTER}
                                />
                                {
                                    allAgentsDataTransformed[siteName]?.map((i, index) => (
                                        <KeyValuePairs
                                            key={index}
                                            keyValuePairArray={[
                                                {"Agent Name":i.agentName},
                                                {"Sold Area":i.soldArea},
                                                {"Should Pay":i.shouldPay},
                                                {"Paid":i.paid},
                                                {"Pendings":i.pending}
                                            ]}
                                        />
                                    ))
                                }
                            </span>
                        ))
                    }

                </div>
                

        </div>
    )
};

export default Agents;