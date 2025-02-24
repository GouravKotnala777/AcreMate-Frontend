import { useEffect, useRef, useState } from "react";
import { findAllSlips } from "../api";
import { SlipTypes } from "../utils/types";
import { useIsScrollerBottomVisible } from "../utils/hooks";
import Spinner from "../components/Spinner";


const Slips = () => {
    const [allSlips, setAllSlips] = useState<SlipTypes[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const scrollEnd = useRef<HTMLDivElement|null>(null);
    const isVisible = useIsScrollerBottomVisible(scrollEnd);
    const [isLoading, setIsLoading] = useState<boolean>(false);



    useEffect(() => {
        if (isVisible) {
            setSkip((prev) => prev+2);
        }
    }, [isVisible]);

    useEffect(() => {
        if (skip) {
            setIsLoading(true);
            findAllSlips({skip})
            .then((data) => {
                setAllSlips((prev) => [...prev, ...data.jsonData]);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
        }
    }, [skip]);
    return(
        <div className="slips_bg">
            {/*<h1>{JSON.stringify(isScrollBottomVisible)}</h1>*/}
            <pre>{JSON.stringify(allSlips, null, `\t`)}</pre>
            <div id="scroll_end"></div>
            {/*<button onClick={fetchAgain}>fetch</button>*/}
            <div ref={scrollEnd}>
                {
                    isLoading ?
                        <Spinner width="100px" border="10px solid white" borderTop={`10px solid black`} />
                        :
                        <h1>end</h1>
                }
            </div>
        </div>
    )
};

export default Slips;