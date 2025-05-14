import React, { useState, useRef } from "react";
import "./prac.scss";

const DraggablePage = () => {
  const containerRef = useRef(null);
  const draggedBoxIndex = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [boxes, setBoxes] = useState([
    { id: 1, name: "Div One", x: 0, y: 0 },
    { id: 2, name: "Div Two", x: 140, y: 0 },
    { id: 3, name: "Div Three", x: 280, y: 0 },
  ]);

  const [dragInfo, setDragInfo] = useState({
    name: "",
    position: { x: 0, y: 0 },
    isDragging: false,
  });

  const handleDragStart = (e, index) => {
    draggedBoxIndex.current = index;
    const containerRect = containerRef.current.getBoundingClientRect();
    const box = boxes[index];
  
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;
  
    // Save where inside the box the mouse was grabbed
    setOffset({
      x: mouseX - box.x,
      y: mouseY - box.y,
    });
  
    setDragInfo({
      name: box.name,
      isDragging: true,
      position: { x: box.x, y: box.y },
    });
  };
  
  const handleDrag = (e) => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;
  
    setDragInfo((prev) => ({
      ...prev,
      position: {
        x: mouseX - offset.x,
        y: mouseY - offset.y,
      },
    }));
  };

  const handleDrop = () => {
    if (draggedBoxIndex.current === null) return;
  
    const newBoxes = [...boxes];
    newBoxes[draggedBoxIndex.current] = {
      ...newBoxes[draggedBoxIndex.current],
      x: dragInfo.position.x,
      y: dragInfo.position.y,
    };
  
    setBoxes(newBoxes);
    draggedBoxIndex.current = null;
    setDragInfo({ name: "", position: { x: 0, y: 0 }, isDragging: false });
  };

  return (
    <div
      className="prac_cont"
      ref={containerRef}
      onDragOver={(e) => {
        e.preventDefault();
        handleDrag(e);
      }}
      onDrop={handleDrop}
    >
      {boxes.map((box, index) => (
        <div
          className="box"
          key={box.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnd={handleDrop}
          style={{
            left: box.x,
            top: box.y
          }}
        >
          {box.name}
        </div>
      ))}

      {dragInfo.isDragging && (
        <div
          className="tooltip"
          style={{
            top: dragInfo.position.y - 30,
            left: dragInfo.position.x
          }}
        >
          {dragInfo.name} – ({Math.round(dragInfo.position.x)},{Math.round(dragInfo.position.y)})
        </div>
      )}
    </div>
  );
};

export default DraggablePage;
