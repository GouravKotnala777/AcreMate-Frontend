import { useEffect, useRef, useState } from "react";
import { findAllPlots } from "./api";
import { PlotTypes } from "./utils/types";

//const data = [
//    {plotNo:1, size:50, clientID:"client1", agentID:"agent1"}, {plotNo:2, size:50, clientID:"client2", agentID:"agent2"}, {plotNo:3, size:100, clientID:"client3", agentID:"agent3"}, {plotNo:4, size:50, clientID:"client4", agentID:"agent4"}, {plotNo:5, size:40, clientID:"client5", agentID:"agent5"}, {plotNo:6, size:50, clientID:"client6", agentID:"agent6"}, {plotNo:7, size:50, clientID:"client7", agentID:"agent7"}, {plotNo:8, size:60, clientID:"client8", agentID:"agent8"}, {plotNo:9, size:100, clientID:"client9", agentID:"agent9"}, {plotNo:10, size:50, clientID:"client10", agentID:"agent10"},
//    {plotNo:11, size:50, clientID:"client11", agentID:"agent11"}, {plotNo:12, size:50, clientID:"client12", agentID:"agent12"}, {plotNo:13, size:100, clientID:"client13", agentID:"agent13"}, {plotNo:14, size:40, clientID:"client14", agentID:"agent14"}, {plotNo:15, size:40, clientID:"client15", agentID:"agent15"}, {plotNo:16, size:50, clientID:"client16", agentID:"agent16"}, {plotNo:17, size:50, clientID:"client17", agentID:"agent17"}, {plotNo:18, size:100, clientID:"client18", agentID:"agent18"}, {plotNo:19, size:50, clientID:"client19", agentID:"agent19"}, {plotNo:20, size:50, clientID:"client20", agentID:"agent20"},
//    {plotNo:21, size:50, clientID:"client21", agentID:"agent21"}, {plotNo:22, size:40, clientID:"client22", agentID:"agent22"}, {plotNo:23, size:50, clientID:"client23", agentID:"agent23"}, {plotNo:24, size:40, clientID:"client24", agentID:"agent24"}, {plotNo:25, size:40, clientID:"client25", agentID:"agent25"}, {plotNo:26, size:40, clientID:"client26", agentID:"agent26"}, {plotNo:27, size:50, clientID:"client27", agentID:"agent27"}, {plotNo:28, size:60, clientID:"client28", agentID:"agent28"}, {plotNo:29, size:60, clientID:"client29", agentID:"agent29"}, {plotNo:30, size:150, clientID:"client30", agentID:"agent30"},
//    {plotNo:31, size:50, clientID:"client31", agentID:"agent31"}, {plotNo:32, size:50, clientID:"client32", agentID:"agent32"}, {plotNo:33, size:50, clientID:"client33", agentID:"agent33"}, {plotNo:34, size:50, clientID:"client34", agentID:"agent34"}, {plotNo:35, size:50, clientID:"client35", agentID:"agent35"}, {plotNo:36, size:50, clientID:"client36", agentID:"agent36"}, {plotNo:37, size:40, clientID:"client37", agentID:"agent37"}, {plotNo:38, size:40, clientID:"client38", agentID:"agent38"}, {plotNo:39, size:50, clientID:"client39", agentID:"agent39"}, {plotNo:40, size:50, clientID:"client40", agentID:"agent40"},
//    //{plotNo:41, size:10, clientID:"client41", agentID:"agent41"}, {plotNo:42, size:20, clientID:"client42", agentID:"agent42"}, {plotNo:43, size:30, clientID:"client43", agentID:"agent43"}, {plotNo:44, size:40, clientID:"client44", agentID:"agent44"}, {plotNo:45, size:50, clientID:"client45", agentID:"agent45"}, {plotNo:46, size:60, clientID:"client46", agentID:"agent46"}, {plotNo:47, size:70, clientID:"client47", agentID:"agent47"}, {plotNo:48, size:80, clientID:"client48", agentID:"agent48"}, {plotNo:49, size:90, clientID:"client49", agentID:"agent49"}, {plotNo:50, size:10, clientID:"client50", agentID:"agent50"}
//];
const rows:number[] = [9];



const Test = () => {
//const Test = ({data, rows}:{data:{plotNo:number, size:number, clientID:string, agentID:string}[]; rows:number[];}) => {
    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    const [data, setData] = useState<PlotTypes[]>([]);


    const aa = async() => {
        const res = await findAllPlots();

        setData(res.jsonData);
    };

    useEffect(() => {
        const boxH = 30;
        const boxY = 10;
        const baseWidth = 50;
        let num = 0;
        
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        
        canvas.width = window.innerWidth;
        canvas.height = 300;
        
        const ctx = canvas.getContext("2d");
        
        if (!ctx) return;
        
        ctx.strokeStyle = "black";

        for(const j in rows){
            let tw:number = 0;
            for(let i=0; i<rows[j]; i++){
                let finalWidth = 0;
                const w = data[num].size;
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
                ctx.font = "12px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(`${data[num-1].plotNo}`, finalWidth+w/2, (boxH/2)+(Number(j)*boxY)+(Number(j)*boxH)-5);
                ctx.fillText(`${data[num-1].size}sqyd`, finalWidth+w/2, (boxH/2)+(Number(j)*boxY)+(Number(j)*boxH)+10);
            }
            ctx.fillText(`=> ${tw}sqyd`, tw+data[data.length-1].size, (Number(j)*boxY)+(Number(j)*boxH)+15);
        }

        ctx.fill();

    }, [aa]);

    return(
        <>
            <h1>Test</h1>
            <button onClick={aa}>Fetch</button>
            <div style={{
                position:"relative"
            }}>
                {
                    data.length !== 0 ?
                        <canvas ref={canvasRef}
                            style={{
                                border:"2px solid red",
                                width:"100%",
                                height:"300px"
                            }}
                        >
                        </canvas>
                        :
                        <h1>No data</h1>

                }
            </div>
        </>
    )
};

export default Test;