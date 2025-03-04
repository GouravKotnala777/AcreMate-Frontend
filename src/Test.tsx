import { useEffect, useRef } from "react";

const data = [
    {p:1, w:50}, {p:2, w:50}, {p:3, w:100}, {p:4, w:50}, {p:5, w:40}, {p:6, w:50}, {p:7, w:50}, {p:8, w:60}, {p:9, w:100}, {p:10, w:50},
    {p:11, w:50}, {p:12, w:50}, {p:13, w:100}, {p:14, w:40}, {p:15, w:40}, {p:16, w:50}, {p:17, w:50}, {p:18, w:100}, {p:19, w:50}, {p:20, w:50},
    {p:21, w:50}, {p:22, w:40}, {p:23, w:50}, {p:24, w:40}, {p:25, w:40}, {p:26, w:40}, {p:27, w:50}, {p:28, w:60}, {p:29, w:60}, {p:30, w:150},
    {p:31, w:50}, {p:32, w:50}, {p:33, w:50}, {p:34, w:50}, {p:35, w:50}, {p:36, w:50}, {p:37, w:40}, {p:38, w:40}, {p:39, w:50}, {p:40, w:50},
    //{p:41, w:10}, {p:42, w:20}, {p:43, w:30}, {p:44, w:40}, {p:45, w:50}, {p:46, w:60}, {p:47, w:70}, {p:48, w:80}, {p:49, w:90}, {p:50, w:10}
];
const rows:number[] = [10, 5, 5, 5, 5, 10];



const Test = () => {
    const canvasRef = useRef<HTMLCanvasElement|null>(null);

    useEffect(() => {
        const boxH = 30;
        const boxY = 10;
        const baseWidth = 50;
        
        if (!canvasRef.current) return;
        
        canvasRef.current.width = window.innerWidth*2;
        canvasRef.current.height = 300;
        
        const ctx = canvasRef.current.getContext("2d");
        
        if (!ctx) return;
        
        ctx.strokeStyle = "black";

        let num = 0;
        for(const j in rows){
            let tw:number = 0;
            for(let i=0; i<rows[j]; i++){
                let finalWidth = 0;
                const w = data[num].w;
                num = num + 1;
                tw = tw + w;
                if (w < baseWidth) {
                    finalWidth = tw+baseWidth-w;
                }
                else if (w === baseWidth) {
                    finalWidth = tw;
                }
                else{
                    finalWidth = tw+baseWidth-w;
                }
                ctx.strokeRect(finalWidth, (Number(j)*boxY)+(Number(j)*boxH), w, boxH);
                ctx.font = "14px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(`${num}`, finalWidth+w/2, (boxH/2)+(Number(j)*boxY)+(Number(j)*boxH));
            }
            
        }

        ctx.fill();
    


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