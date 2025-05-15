import { useEffect, useState } from "react";
import "../styles/pages/agents.scss";
import { agentsAndSoldArea, findAllSitesName } from "../api";
import { KeyValuePairs } from "../shared/SharedComponents";
import { PRIMARY_LIGHTER } from "../utils/constants";
//import { PlotTypes } from "../utils/types";


const Agents = () => {
    const [siteNameArray, setSiteNameArray] = useState<string[]>([]);
    const [allAgentsDataTransformed, setAllAgentsDataTransformed] = useState<
        {
            [key:string]:({paid:number; shouldPay:number; agentName:string; soldArea:number; pending:number;})[]
        }
    >({});

    useEffect(() => {
        findAllSitesName()
        .then((res) => {
            setSiteNameArray(res.jsonData);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
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
                <div className="site_cont">
                    {
                        siteNameArray.map((siteName, ind) => (
                            <span key={ind}>
                                
                                <KeyValuePairs
                                    keyValuePairArray={[
                                        {"Site":siteName}
                                    ]}
                                    margin="20px auto 0 auto"
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
                                            margin="auto"
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