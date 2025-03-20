import "../styles/pages/slips.scss"
import { useEffect, useState } from "react";
import { findSlipsWithSlipNoRange } from "../api";
import { SlipTypes } from "../utils/types";
import { BG_COLOR, PRIMARY_LIGHT } from "../utils/constants";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const recentSlip = 731;
const limit = 5;

const Slips = () => {
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [skip, setSkip] = useState<number>(0);
    const [hoveringPage, setHoveringPage] = useState<string>("");
    const [slipNoRange, setSlipNoRange] = useState<{fromSlipNo:number; toSlipNo:number;}>({fromSlipNo:1, toSlipNo:20});
    const [slips, setSlips] = useState<(SlipTypes&{clientID:{name:string; guardian:string; mobile:string;}}&{plotID:{plotNo:number; site:string;}})[]>([]);





    const paginationNumberHandler = () => {
        const arr = [];
        for(let i=0; i<5; i++){
            arr.push(<button id={`page-${(limit*skip)+1+i}`} className="1_page page"
                onClick={() => onclickPagination(`page-${(limit*skip)+1+i}`, (limit*skip)+1+i)}
                style={{
                    color:(limit*skip)+1+i<=totalPages?"#313131":"#d1d1d1",
                    backgroundColor:
                        (limit*skip)+1+i<=totalPages?
                            hoveringPage === `page-${(limit*skip)+1+i}`?
                                PRIMARY_LIGHT
                                :
                                "unset"
                            :
                            BG_COLOR
                }}
            >{(limit*skip)+1+i}</button>);
        }
        return arr;
    }
    
    const onclickPagination = (elementID:string, value:number) => {
        if (value > 0 && value <= totalPages) {
            setCurrentPage(value-1);
            setHoveringPage(elementID);
        }
    };

    const leftArrowHandler = () => {
        if (skip === 0) {
            return;
        }
        setSkip(prev => prev - 1)
    }
    const rightArrowHandler = () => {
        if (skip+1 < Math.ceil(totalPages/5)) {
            setSkip(prev => prev + 1)
        }
    }

    useEffect(() => {
        setTotalPages(Math.floor(recentSlip/100));
    }, []);

    useEffect(() => {
        findSlipsWithSlipNoRange(slipNoRange)
        .then((data) => {
            console.log(data);
            setSlips(data.jsonData);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [slipNoRange]);


    return(
        <div className="slips_bg">
            <div className="slips_cont">
                <div className="slip_cont" style={{
                    backgroundColor:PRIMARY_LIGHT
                }}>
                    <div className="slip_no slip_info slip_info_heading">Slip No.</div>
                    <div className="status slip_info slip_info_heading">Type</div>
                    <div className="name slip_info slip_info_heading">Name</div>
                    <div className="s/o slip_info slip_info_heading">Guardian</div>
                    <div className="mobile slip_info slip_info_heading">Mobile</div>
                    <div className="plot_no slip_info slip_info_heading">Plot No.</div>
                    <div className="site slip_info slip_info_heading">Site</div>
                    <div className="amount slip_info slip_info_heading">Amount</div>
                    <div className="mode_of_pay slip_info slip_info_heading">Mode</div>
                    <div className="id slip_info slip_info_heading">Transaction No.</div>
                </div>
                {
                    slips.map((slip) => (
                        <div className="slip_cont">
                            <div className="slip_no slip_info">{slip.slipNo}</div>
                            <div className="status slip_info">{slip.slipType}</div>
                            <div className="name slip_info">{slip.clientID.name}</div>
                            <div className="s/o slip_info">{slip.clientID.guardian}</div>
                            <div className="mobile slip_info">{slip.clientID.mobile}</div>
                            <div className="plot_no slip_info">{slip.plotID.plotNo}</div>
                            <div className="site slip_info">{slip.plotID.site}</div>
                            <div className="amount slip_info">{slip.amount}</div>
                            <div className="mode_of_pay slip_info">{slip.modeOfPayment}</div>
                            <div className="id slip_info">122321</div>
                        </div>
                    ))
                }
            </div>
            <div className="slip_selectors_cont">
                <button className="slip_selector_cont" onClick={() => setSlipNoRange({fromSlipNo:Number(currentPage+"01"), toSlipNo:Number(currentPage+"20")})}>
                    <div className="to_value">{currentPage}01</div>
                    &nbsp;-&nbsp;
                    <div className="from_value">{currentPage}20</div>
                </button>
                <button className="slip_selector_cont" onClick={() => setSlipNoRange({fromSlipNo:Number(currentPage+"21"), toSlipNo:Number(currentPage+"40")})}>
                    <div className="to_value">{currentPage}21</div>
                    &nbsp;-&nbsp;
                    <div className="from_value">{currentPage}40</div>
                </button>
                <button className="slip_selector_cont" onClick={() => setSlipNoRange({fromSlipNo:Number(currentPage+"41"), toSlipNo:Number(currentPage+"60")})}>
                    <div className="to_value">{currentPage}41</div>
                    &nbsp;-&nbsp;
                    <div className="from_value">{currentPage}60</div>
                </button>
                <button className="slip_selector_cont" onClick={() => setSlipNoRange({fromSlipNo:Number(currentPage+"61"), toSlipNo:Number(currentPage+"80")})}>
                    <div className="to_value">{currentPage}61</div>
                    &nbsp;-&nbsp;
                    <div className="from_value">{currentPage}80</div>
                </button>
                <button className="slip_selector_cont" onClick={() => setSlipNoRange({fromSlipNo:Number(currentPage+"81"), toSlipNo:Number((currentPage+1)+"00")})}>
                    <div className="to_value">{currentPage}81</div>
                    &nbsp;-&nbsp;
                    <div className="from_value">{currentPage+1}00</div>
                </button>
            </div>
            <div className="pagination_cont">
                <button className="left_arrow" onClick={leftArrowHandler}><BiLeftArrow /></button>
                {
                    paginationNumberHandler()
                }
                <button className="right_arrow" onClick={rightArrowHandler}><BiRightArrow /></button>
            </div>
        </div>
    )
};

export default Slips;