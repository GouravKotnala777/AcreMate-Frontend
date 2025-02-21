import { useEffect, useRef, useState } from "react";
import { findAllSlips } from "../api";
import { SlipTypes } from "../utils/types";
import { useIsScrollerBottomVisible } from "../utils/hooks";


const Slips = () => {
    const [allSlips, setAllSlips] = useState<SlipTypes[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const slipsBg = useRef<HTMLDivElement>(null);
    const scrollEnd = useRef<HTMLDivElement|null>(null);
    const isVisible = useIsScrollerBottomVisible(scrollEnd);


    const fetchAgain = () => {
        setSkip((prev) => prev+2);
    };

    useEffect(() => {
        if (allSlips.length !== 0 && isVisible) {
            fetchAgain();
        }
    }, [allSlips.length, isVisible]);

    useEffect(() => {
        findAllSlips({skip})
        .then((data) => {
            setAllSlips((prev) => [...prev, ...data.jsonData]);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [skip]);
    return(
        <div className="slips_bg" ref={slipsBg}>
            {/*<h1>{JSON.stringify(isScrollBottomVisible)}</h1>*/}
            <pre>{JSON.stringify(allSlips, null, `\t`)}</pre>
            <div id="scroll_end"></div>
            {/*<button onClick={fetchAgain}>fetch</button>*/}
            <div ref={scrollEnd}>scroll end</div>
        </div>
    )
};

export default Slips;