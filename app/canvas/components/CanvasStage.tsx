import React from "react";
import { Stage, Layer, Line } from "react-konva";
import CanvasShapes from "./CanvasShapes";

interface CanvasStageProps {
  stageRef: any;
  shapes: any[];
  setShapes: React.Dispatch<React.SetStateAction<any[]>>;
  lines: any[];
  setLines: React.Dispatch<React.SetStateAction<any[]>>;
  isDrawingActive: boolean;
  setIsDrawingActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const CanvasStage = ({
  stageRef,
  shapes,
  setShapes,
  lines,
  setLines,
  isDrawingActive
}: CanvasStageProps) => {
  const isDrawing = React.useRef(false);

  // Mouse down handler for drawing mode
  const handleMouseDown = (e: any) => {
    if (isDrawingActive) {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines((prevLines) => [...prevLines, { points: [pos.x, pos.y] }]);
    }
  };

  // Mouse move handler for drawing mode
  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setLines((prevLines) => {
      const lastLine = prevLines[prevLines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);

      const updatedLines = [...prevLines];
      updatedLines[updatedLines.length - 1] = lastLine;
      return updatedLines;
    });
  };

  // Mouse up handler to stop drawing
  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="w-full bg-emerald-100/50"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke="black"
            strokeWidth={2}
            tension={0.5}
            lineCap="round"
            globalCompositeOperation="source-over"
          />
        ))}
        <CanvasShapes shapes={shapes} setShapes={setShapes} />
      </Layer>
    </Stage>
  );
};

export default CanvasStage;
