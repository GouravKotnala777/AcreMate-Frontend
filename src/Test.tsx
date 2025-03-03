import { useEffect, useRef } from "react";

const data = [
    {p:1, w:10}, {p:2, w:20}, {p:3, w:30}, {p:4, w:40}, {p:5, w:50}, {p:6, w:60}, {p:7, w:70}, {p:8, w:80}, {p:9, w:90}, {p:10, w:10},
    {p:11, w:50}, {p:12, w:50}, {p:13, w:100}, {p:14, w:40}, {p:15, w:40}, {p:16, w:50}, {p:17, w:50}, {p:18, w:100}, {p:19, w:50}, {p:20, w:50},
    {p:21, w:20}, {p:22, w:20}, {p:23, w:20}, {p:24, w:20}, {p:25, w:20}, {p:26, w:20}, {p:27, w:20}, {p:28, w:20}, {p:29, w:20}, {p:30, w:20},
    {p:31, w:20}, {p:32, w:20}, {p:33, w:20}, {p:34, w:20}, {p:35, w:20}, {p:36, w:20}, {p:37, w:20}, {p:38, w:20}, {p:39, w:20}, {p:40, w:20}
];
const cols:number[] = [10, 10, 10, 10];

//const data = [
//    {p:1, w:40},
//    {p:2, w:20},
//    {p:3, w:40},
//    {p:4, w:20},
//    {p:5, w:20},
//    {p:6, w:40},
//]
//const cols:number[] = [2, 3, 1];


const Test = () => {
    const canvasRef = useRef<HTMLCanvasElement|null>(null);

    useEffect(() => {
        const boxHeight = 20;
        const gap = 30;
        const startX = 50;
        const startY = 10;
        let pn:number = 0;
        
        if (!canvasRef.current) return;

        canvasRef.current.width = window.innerWidth*2;
        canvasRef.current.height = 300;
        
        const ctx = canvasRef.current.getContext("2d");
        
        if (!ctx) return;

        for(const i in cols){
            let tw = 0;
            for(let j=0; j<cols[i]; j++){
                let x = 0;
                if (j === 0) {
                    tw = tw + startX + (j) * (gap/6) * (data[pn].w/8)+(tw/10);
                    x = startX + (j) * (gap/6) * (data[pn].w/8);
                }
                else{
                    tw = tw + startX + (j) * (gap/6) * (data[pn].w/14)+(tw/10);
                    x = startX + (j) * (gap/6) * (data[pn].w/14) + tw;
                }
                const y = startY + (Number(i))*gap;
                
                ctx.strokeStyle = "black";
                ctx.strokeRect(x, y, data[pn].w, boxHeight);
                //ctx.strokeRect(x, y, data[j].w, boxHeight);
    
                ctx.fillStyle = "black";
                ctx.font = "14px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(`${pn+1}`, x+(data[pn].w/2), y+(boxHeight/2));   
                pn++;
            }
        }
    


    }, []);

    return(
        <>
            <h1>Test</h1>
            <canvas ref={canvasRef} style={{
                border:"2px solid red",
                width:"200%",
                height:"300px"
            }}>

            </canvas>
        </>
    )
};

export default Test;