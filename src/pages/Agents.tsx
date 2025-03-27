import { MouseEvent, useEffect, useRef, useState } from "react";
import "../styles/pages/agents.scss";
import { KeyValuePairs } from "../shared/SharedComponents";

const dummyData = {
    shouldPay:9000,
    payments:[
        {
            amount:10000,
            pending:2000,
            createdAt:"20-01-25"            
        },
        {
            amount:7000,
            pending:2000,
            createdAt:"21-02-25"            
        },
        {
            amount:8000,
            pending:2000,
            createdAt:"19-03-25"            
        },
        {
            amount:7000,
            pending:2000,
            createdAt:"21-04-25"            
        },
        {
            amount:8000,
            pending:2000,
            createdAt:"19-05-25"            
        },
        {
            amount:9000,
            pending:2000,
            createdAt:"24-06-25"            
        },
        {
            amount:10000,
            pending:2000,
            createdAt:"20-07-25"            
        },
        {
            amount:11000,
            pending:2000,
            createdAt:"22-08-25"            
        },
        {
            amount:9000,
            pending:2000,
            createdAt:"24-09-25"            
        },
        {
            amount:10000,
            pending:2000,
            createdAt:"20-10-25"            
        },
        {
            amount:11000,
            pending:2000,
            createdAt:"22-11-25"            
        }
    ]
};
const Agents = () => {
    //const [allAgentsData, setAllAgentsData] = useState<UserTypes[]>([]);
    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    const [nodeValue, setNodeValue] = useState<{lowest:number; highest:number;}>({lowest:0, highest:0});
    const [yRange, setYRange] = useState<number[]>([]);
    const [tooltipCollection, setTooltipCollection] = useState<{x:number; y:number; amount:number}[]>([]);
    const [tooltip, setTooltip] = useState<{x:number; y:number; amount:number}>({x:0, y:0, amount:0});
    const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);


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

    const getHighestAmount = () => {
        let lowestNum = 0;
        let highestNum = 0;
        const y_range:number[] = [];
        let y_interval = 0;
        for(const payment of dummyData.payments){
            if (payment.amount > highestNum) {
                highestNum = payment.amount;
            }
            if (payment.amount < lowestNum) {
                lowestNum = payment.amount;
            }
            if (lowestNum === 0) {
                lowestNum = payment.amount;
            }
        }

        setNodeValue({lowest:lowestNum, highest:highestNum});
        
        y_interval = Math.ceil((highestNum-lowestNum)/(dummyData.payments.length*2));
        
        for(let i=0; i<=dummyData.payments.length*2; i++){
            y_range.push(lowestNum+(y_interval*(i)));
            setYRange((prev) => [...prev, lowestNum+(y_interval*(i))]);
        }
        
        console.log(lowestNum, highestNum);
        console.log(nodeValue);
        console.log(y_interval);
        console.log(y_range);        
    };

    const convertMoneyToPx = (amount:number, xAxisMarginTop:number) => {
        if (!amount) return 0;
        const valueInPx = ((amount-nodeValue.lowest)/1)/((nodeValue.highest-nodeValue.lowest)/xAxisMarginTop);
        if (!isFinite(valueInPx)) return 0;
        return Math.ceil(valueInPx);
    };

    const tooltipHandler = (e:MouseEvent<HTMLCanvasElement>) => {
        setTooltip({x:e.clientX-10, y:e.clientY-257, amount:10000});
    };

    useEffect(() => {
        if (tooltipCollection.find((tltp) => 
            tooltip.x >= tltp.x-5 &&
            tooltip.x <= tltp.x+5 &&
            tooltip.y >= tltp.y-5 &&
            tooltip.y <= tltp.y+5
        )) {
            console.log("AAAAAAAAAAA");
            setIsTooltipVisible(true);
        }
        else{
            console.log("BBBBBBBBBBB");
            setIsTooltipVisible(false);
        }
    }, [tooltip]);

    useEffect(() => {
        // Canvas variables
        const canvas = canvasRef.current;
        const canvasWidth = 900;
        const canvasHeight = 300;
        // Y-axis variables
        const yAxisMarginLeft = 50;
        const yAxisMarginTop = 0;
        const yAxisMarginBottom = 300;

        if (!canvas) return;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        const ctx = canvas.getContext("2d");
        
        if (!ctx) return;

        // Y-axis line
        ctx.beginPath();
        ctx.moveTo(yAxisMarginLeft, yAxisMarginTop);
        ctx.lineTo(yAxisMarginLeft, yAxisMarginBottom);
        ctx.stroke();

        // EMI line
        ctx.beginPath();
        ctx.moveTo(yAxisMarginLeft, 280-convertMoneyToPx(dummyData.shouldPay, 280)+10);
        ctx.lineTo(canvasWidth, 280-convertMoneyToPx(dummyData.shouldPay, 280)+10);
        ctx.setLineDash([2, 2]);
        ctx.strokeStyle = "#919191";
        ctx.stroke();

        ctx.setLineDash([]);

        // Y-axis dash
        for(let i=0; i<=dummyData.payments.length*2; i++){
            ctx.beginPath();
            ctx.moveTo(45, convertMoneyToPx(yRange[i], 280)+10);
            ctx.lineTo(55, convertMoneyToPx(yRange[i], 280)+10);
            ctx.stroke();
        }
        // Y-axis lables
        for(let i=0; i<=dummyData.payments.length*2; i++){
            ctx.font = "10px arial";
            ctx.fillText((yRange[(dummyData.payments.length*2) - i]??0).toString(), 10, convertMoneyToPx(yRange[i], 280)+13);
        }
        // Dots
        for(let i=0; i<dummyData.payments.length; i++){
            ctx.beginPath();
            ctx.arc((i*50)+50+50, 280-convertMoneyToPx(dummyData.payments[i].amount, 280)+10, 2.5, 0, 2.5*Math.PI);
            if (dummyData.payments[i].amount >= dummyData.shouldPay) {
                ctx.strokeStyle = "#00a700";
                ctx.fillStyle = "#93ff93";
                
            } else {
                ctx.strokeStyle = "#a70000";
                ctx.fillStyle = "#ff9393";
            }
            ctx.fill();
            ctx.stroke();

            
            if (convertMoneyToPx(dummyData.payments[i].amount, 280)) {
                console.log({
                    x:(i*50)+50+50,
                    y:(280-convertMoneyToPx(dummyData.payments[i].amount, 280))+10,
                    amount:dummyData.payments[i].amount
                });
                setTooltipCollection((prev) => [...prev, {x:(i*50)+50+50, y:(280-convertMoneyToPx(dummyData.payments[i].amount, 280))+10, amount:dummyData.payments[i].amount}]);
            }
        }
        // Lines
        for(let i=0; i<dummyData.payments.length; i++){
            ctx.beginPath();
            if (dummyData.payments[i].amount >= dummyData.shouldPay) {
                ctx.strokeStyle = "#51ff51";
            
            } else {
                ctx.strokeStyle = "#ff5151";
            }
            ctx.moveTo((i*50)+50+50, 280-convertMoneyToPx(dummyData.payments[i].amount, 280)+10);
            if (i+1 < dummyData.payments.length) {
                ctx.lineTo(((i+1)*50)+50+50, 280-convertMoneyToPx(dummyData.payments[i+1].amount, 280)+10);
            }
            ctx.stroke();
        }
    }, [nodeValue]);


    const gg = () => {
        console.log(tooltipCollection);
    }
    


    return(
        <div className="agents_bg">
            <h1>Agents</h1>
            <pre style={{fontSize:"8px"}}>{JSON.stringify(tooltip, null, `\t`)}</pre>
            {/*<pre style={{fontSize:"8px"}}>{JSON.stringify(isTooltipVisible, null, `\t`)}</pre>*/}
            <button onClick={getHighestAmount}>Calculate</button>
            <button onClick={gg}>EMIs</button>

            <canvas ref={canvasRef} className="emi_chart" onMouseMove={(e) => tooltipHandler(e)}>

            </canvas>

            {
                isTooltipVisible &&
                    <div className="tooltip_dialog"
                        style={{
                            //display:isTooltipVisible?"block":"none",
                            top:`${tooltip.y+70}px`,
                            left:`${tooltip.x}px`
                        }}
                    >
                        <KeyValuePairs
                            keyValuePairArray={[{
                                "amount":tooltip.amount
                            }]}
                        />
                    </div>
            }
        </div>
    )
};

export default Agents;