import "../styles/pages/home.scss";
import { useEffect, useRef, useState } from "react";
import { PlotTypes } from "../utils/types";
import { findPendingClients } from "../api";
import { PRIMARY_LIGHT } from "../utils/constants";
import { useNavigate } from "react-router-dom";



const Home = () => {
    const [allPendingPlots, setAllPendingPlots] = useState<(
        PlotTypes&
        {pending:number; timeCovered:number;}&
        {clientDetailes:{serialNumber:string; name:string; guardian:string; mobile:string;}}&
        {lastSlip:{_id:string; amount:number; createdAt:Date;}}
    )[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const scrollBottomRef = useRef<HTMLDivElement|null>(null);
    const navigate = useNavigate();


    const findPendingClientsHandler = async() => {
        if ((typeof skip !== "number") || (skip < 0 )) return;
        const res = await findPendingClients(skip);
        if (res.success) {
            setAllPendingPlots((prev) => [...prev, ...res.jsonData]);
            setSkip((prev) => prev+1);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((enteries) => {
            if (enteries[0].isIntersecting) {
                findPendingClientsHandler();
            }
        }, {threshold:1});
        
        const scrollBottom = scrollBottomRef.current;
        if (!scrollBottom) return;
        observer.observe(scrollBottom);

        return() => {
            if (scrollBottom) observer.unobserve(scrollBottom);
        }
    }, []);

    return(
        <div className="home_bg">
            <h1>Home</h1>
            <button onClick={() => findPendingClientsHandler()}>Fetch Pendings</button>
            <div className="slips_cont">
                <div className="slip_cont" style={{
                    backgroundColor:PRIMARY_LIGHT
                }}>
                    <div className="slip_no slip_info slip_info_heading">Serial No.</div>
                    <div className="name slip_info slip_info_heading">Name</div>
                    <div className="s/o slip_info slip_info_heading">Guardian</div>
                    <div className="plot_no slip_info slip_info_heading">Plot No.</div>
                    <div className="site slip_info slip_info_heading">Site</div>
                    <div className="site slip_info slip_info_heading">Last Slip Date</div>
                    <div className="site slip_info slip_info_heading">Last Slip Amount</div>
                    <div className="mobile slip_info slip_info_heading">Mobile</div>
                    <div className="mobile slip_info slip_info_heading">Time Covered</div>
                    <div className="amount slip_info slip_info_heading">Pending</div>
                    <div className="send_sms slip_info slip_info_heading">View</div>
                    <div className="send_sms slip_info slip_info_heading">Send SMS</div>
                </div>
                {
                    allPendingPlots.map((plt) => (
                        <div className="slip_cont" key={plt._id}>
                            <div className="slip_no slip_info">{plt.clientDetailes.serialNumber}</div>
                            <div className="name slip_info">{plt.clientDetailes.name}</div>
                            <div className="s/o slip_info">{plt.clientDetailes.guardian}</div>
                            <div className="plot_no slip_info">{plt.plotNo}</div>
                            <div className="site slip_info">{plt.site}</div>
                            <div className="site slip_info">{new Date(plt.lastSlip.createdAt).toLocaleDateString("en-GB")}</div>
                            <div className="site slip_info">{plt.lastSlip.amount}</div>
                            <div className="mobile slip_info">{plt.clientDetailes.mobile}</div>
                            <div className="amount slip_info">{plt.timeCovered}</div>
                            <div className="amount slip_info" style={{
                                color:"red",
                                fontWeight:"600"
                            }}>{plt.pending}</div>
                            <div className="send_sms slip_info slip_info_heading">
                                <button className="send_sms_btn" onClick={() => navigate(`/single-plot?plotID=${plt._id}`)}>S</button>
                            </div>
                            <div className="send_sms slip_info slip_info_heading">
                                <button className="send_sms_btn">S</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/*<pre>{JSON.stringify(allPendingPlots, null, `\t`)}</pre>*/}
            <div className="scroll_bottom" ref={scrollBottomRef}>load more...</div>
        </div>
    )
};

export default Home;