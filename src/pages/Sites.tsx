import { useEffect, useState } from "react";
import { findAllSites } from "../api";
import { SiteTypes } from "../utils/types";
import { PRIMARY_LIGHT } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import "../styles/pages/sites.scss";


const Sites = () => {
    const [allSites, setAllSites] = useState<SiteTypes[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        findAllSites()
        .then((data) => {
            setAllSites(data.jsonData);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return(
        <div className="sites_bg">
            <h1>Sites</h1>
            {/*<pre>{JSON.stringify(allSites, null, `\t`)}</pre>*/}
            {/*<Table data={allSites} />*/}

            <button onClick={() => navigate("/create?formPanelFor=sites")}>Create Site</button>
            <div className="slips_cont">
                <div className="slip_cont" style={{
                    backgroundColor:PRIMARY_LIGHT
                }}>
                    <div className="slip_no slip_info slip_info_heading">ID</div>
                    <div className="name slip_info slip_info_heading">Site Name</div>
                    <div className="s/o slip_info slip_info_heading">Total Size</div>
                    <div className="plot_no slip_info slip_info_heading">Sold Area</div>
                    <div className="plot_no slip_info slip_info_heading">View</div>
                    <div className="plot_no slip_info slip_info_heading">Patoni</div>
                </div>
                {
                    allSites.map((sit) => (
                        <div className="slip_cont" key={sit._id}>
                            <div className="slip_no slip_info">{sit._id}</div>
                            <div className="slip_no slip_info">{sit.siteName}</div>
                            <div className="slip_no slip_info">{sit.totalSize}</div>
                            <div className="slip_no slip_info">{sit.soldArea}</div>
                            <div className="send_sms slip_info slip_info_heading">
                                <button className="send_sms_btn" onClick={() => navigate(`/single-site?siteID=${sit._id}`)}>S</button>
                            </div>
                            <div className="send_sms slip_info slip_info_heading">
                                <button className="send_sms_btn" onClick={() => navigate("/create?formPanelFor=plots")}>Add Plots</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default Sites;