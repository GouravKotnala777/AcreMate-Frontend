import "./prac.scss";
import { DragEvent, useRef, useState } from "react";


const DraggablePage = () => {
  const pracContRef = useRef<HTMLDivElement>(null);
  const draggedBoxIndex = useRef<number|null>(null);
  const [offset, setOffset] = useState({x:0, y:0});
  const [boxes, setBoxes] = useState([
    { id: 1, name: "Div One", x: 0, y: 0 },
    { id: 2, name: "Div Two", x: 140, y: 0 },
    { id: 3, name: "Div Three", x: 280, y: 0 }
  ]);
  const [dragInfo, setDragInfo] = useState({
    name:"",
    position:{x:0, y:0},
    isDragging:false
  });


  const handleDragStart = (e:DragEvent<HTMLDivElement>, index:number) => {
    draggedBoxIndex.current = index;
    if (!pracContRef.current)return;

    const pracContRect = pracContRef.current.getBoundingClientRect();
    const box = boxes[index];

    const mouseX = e.clientX - pracContRect.left;
    const mouseY = e.clientY - pracContRect.top;

    setOffset({
      x:mouseX - box.x,
      y:mouseY - box.y
    });

    setDragInfo({
      name:box.name,
      isDragging:true,
      position:{
        x:box.x,
        y:box.y
      }
    });
  };
  const handleDrag = (e:DragEvent<HTMLDivElement>) => {
    if (!pracContRef.current)return;

    const pracContRect = pracContRef.current.getBoundingClientRect();
    const mouseX = e.clientX - pracContRect.left;
    const mouseY = e.clientY - pracContRect.top;

    setDragInfo((prev) => ({
      ...prev,
      position:{
        x:mouseX - offset.x,
        y:mouseY - offset.y
      }
    }))
  };
  const handleDrop = () => {
    if (draggedBoxIndex.current === null) return;

    const newBoxes = [...boxes];
    newBoxes[draggedBoxIndex.current] = {
      ...newBoxes[draggedBoxIndex.current],
      x:dragInfo.position.x,
      y:dragInfo.position.y
    };

    setBoxes(newBoxes);
    draggedBoxIndex.current = null;
    setDragInfo({ name: "", position: { x: 0, y: 0 }, isDragging: false });
  };


  const getFinalData = () => {
    console.log(boxes);
  }

  return(
    <>
      <button onClick={getFinalData}>Final Data</button>
      <div className="prac_cont" ref={pracContRef}
        onDragOver={(e) => {
          e.preventDefault();
          handleDrag(e);
        }}
        onDrop={handleDrop}
      >
        {
          boxes.map((box, index) => (
            <div className="box" key={box.id} draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDrop}
              style={{
                left:box.x,
                top:box.y
              }}
            >{box.name}</div>
          ))
        }
        {
          dragInfo.isDragging && (
            <div className="tooltip"
              style={{
                top:dragInfo.position.y - 30,
                left:dragInfo.position.x
              }}
            >
              {dragInfo.name} – ({Math.round(dragInfo.position.x)},{Math.round(dragInfo.position.y)})
            </div>)
        }
      </div>
    </>
  );
};

export default DraggablePage;