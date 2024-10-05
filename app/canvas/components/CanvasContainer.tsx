"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { Stage, Layer, Rect, Circle, Text, Group, Line, Arrow, Image } from "react-konva";
import Panel from "./Panel";
import useImage from "use-image";

const UploadedImage = ({ src, x, y }: { src: string; x: number; y: number }) => {
  const [image] = useImage(src);
  return <Image image={image} x={x} y={y} draggable />;
};

const InfiniteCanvas = () => {
  const [shapes, setShapes] = useState<any[]>([]);
  const [lines, setLines] = useState<any[]>([]);
  const [arrows, setArrows] = useState<any[]>([]); // State to store arrows
  const [redoStack, setRedoStack] = useState<any[]>([]);
  const [undoStack, setUndoStack] = useState<any[]>([]);
  const [isDrawingActive, setIsDrawingActive] = useState(false);
  const [editingTextIndex, setEditingTextIndex] = useState<number | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [selectedShape, setSelectedShape] = useState<number | null>(null); // Track selected shape
  const [isArrowMode, setIsArrowMode] = useState(false);
  const [arrowStartShape, setArrowStartShape] = useState<number | null>(null); // Starting shape for arrows

  const isDrawing = useRef(false);
  const stageRef = useRef<any>(null);

  const addShape = useCallback((newShape: any) => {
    setShapes((prev) => [...prev, newShape]);
    setUndoStack((prev) => [...prev, { action: "add", shape: newShape }]);
  }, []);

  const handleUploadImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        addShape({ type: "image", src: reader.result as string, x: 100, y: 100 });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleMouseDown = (e: any) => {
    if (isDrawingActive) {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines((prevLines) => [...prevLines, { points: [pos.x, pos.y] }]);
      setUndoStack((prev) => [...prev, { action: "draw", line: { points: [pos.x, pos.y] } }]);
    } else {
      // Deselect shapes when clicking on empty canvas
      setSelectedShape(null);
    }
  };

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

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleAddStickyNote = useCallback(() => {
    addShape({
      type: "stickyNote",
      text: "New Note",
      x: 150,
      y: 150,
      width: 300,
      height: 300,
      backgroundColor: "#BDFADC",
    });
  }, [addShape]);

  const handleActivateDrawing = useCallback(() => {
    setIsDrawingActive((prev) => !prev);
  }, []);

  const handleZoomIn = () => stageRef.current.scale({ x: 1.1, y: 1.1 });
  const handleZoomOut = () => stageRef.current.scale({ x: 0.9, y: 0.9 });
  const handleZoomToFit = () => {
    const stage = stageRef.current;
    stage.scale({ x: 1, y: 1 });
    stage.position({ x: 0, y: 0 });
    stage.batchDraw();
  };

  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;

    const lastAction = undoStack.pop();
    if (lastAction.action === "add") {
      setShapes((prevShapes) => prevShapes.slice(0, -1));
    } else if (lastAction.action === "draw") {
      setLines((prevLines) => prevLines.slice(0, -1));
    }
    setRedoStack((prev) => [...prev, lastAction]);
  }, [undoStack]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;

    const lastUndoneAction = redoStack.pop();
    if (lastUndoneAction.action === "add") {
      setShapes((prevShapes) => [...prevShapes, lastUndoneAction.shape]);
    } else if (lastUndoneAction.action === "draw") {
      setLines((prevLines) => [...prevLines, lastUndoneAction.line]);
    }
    setUndoStack((prev) => [...prev, lastUndoneAction]);
  }, [redoStack]);

  const handleResetCanvas = () => {
    setShapes([]);
    setLines([]);
    setUndoStack([]);
    setRedoStack([]);
  };

  const handleTextDoubleClick = (index: number) => {
    setEditingTextIndex(index);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const updatedShapes = [...shapes];
    updatedShapes[index].text = e.target.value;
    setShapes(updatedShapes);
  };

  const handleSelectShape = (index: number) => {
    setSelectedShape(index);
  };
  
  const handleArrowStart = (index: number) => {
    if (isArrowMode) {
      if (arrowStartShape === null) {
        setArrowStartShape(index); // Set the starting shape for the arrow
      } else {
        // Drawing arrow from starting shape to the clicked shape
        const startShape = shapes[arrowStartShape];
        const endShape = shapes[index];
  
        // Calculate the center points for start and end shapes
        const startX = startShape.x + (startShape.width ? startShape.width / 2 : 0);
        const startY = startShape.y + (startShape.height ? startShape.height / 2 : 0);
        const endX = endShape.x + (endShape.width ? endShape.width / 2 : 0);
        const endY = endShape.y + (endShape.height ? endShape.height / 2 : 0);
  
        // Add the new arrow to the state
        setArrows((prevArrows) => [
          ...prevArrows,
          { points: [startX, startY, endX, endY] }
        ]);
  
        // Reset arrow start shape but keep arrow mode active
        setArrowStartShape(null);
      }
    }
  };
  
  const handleToggleArrowMode = () => {
    setIsArrowMode((prev) => !prev);
    setArrowStartShape(null); // Reset any previous arrow start
  };
  
  const renderShape = (shape: any, index: number) => {
    if (shape.type === "stickyNote") {
      return (
        <Group
          key={index}
          draggable
          onClick={() => handleSelectShape(index)} // Click to select shape
          ondbClick={() => handleArrowStart(index)} // Click to start or end arrow
        >
          <Rect
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            fill={shape.backgroundColor}
            stroke={selectedShape === index ? "blue" : "black"}
            strokeWidth={selectedShape === index ? 4 : 1}
          />
          <Text
            text={shape.text}
            x={shape.x + 10}
            y={shape.y + 10}
            width={shape.width - 20}
            height={shape.height - 20}
            fontSize={18}
            fontFamily="Arial"
            fill="black"
            onDblClick={() => handleTextDoubleClick(index)} // Double-click to edit text
          />
        </Group>
      );
    }
    if (shape.type === "image") {
      return <UploadedImage key={index} src={shape.src} x={shape.x} y={shape.y} />;
    }
    return null;
  };
  

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize(); // Set initial size on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const drawGrid = () => {
    const gridSize = 25; 
    const dotRadius = 1; 
    const { width, height } = canvasSize;
    const dots = [];
  
    // Draw horizontal and vertical dots
    for (let y = 0; y < height; y += gridSize) {
      for (let x = 0; x < width; x += gridSize) {
        dots.push(
          <Circle
            key={`dot-${x}-${y}`}
            x={x}
            y={y}
            radius={dotRadius}
            fill="#7A7A7A" 
          />
        );
      }
    }
  
    return dots;
  };
  
  return (
    <div className="flex items-center justify-center">
      <Stage
        ref={stageRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {drawGrid()}
          {lines.map((line, i) => (
            <Line key={i} points={line.points} stroke="black" strokeWidth={2} />
          ))}
          {arrows.map((arrow, i) => (
            <Arrow key={i} points={arrow.points} stroke="black" fill="black" />
          ))}
          {shapes.map((shape, index) => {
            if (shape.type === "stickyNote") {
              return (
                <Group
                  key={index}
                  draggable
                  onClick={() => handleSelectShape(index)}
                  onDblClick={() => handleArrowStart(index)}
                >
                  <Rect
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    fill={shape.backgroundColor}
                    stroke={selectedShape === index ? "blue" : "black"}
                    strokeWidth={selectedShape === index ? 4 : 1}
                  />
                  {editingTextIndex === index ? (
                    // Use foreignObject to render editable text
                    <foreignObject
                      x={shape.x + 10}
                      y={shape.y + 10}
                      width={shape.width - 20}
                      height={shape.height - 20}
                    >
                      <textarea
                        value={shape.text} // Set the value of the textarea to the current shape text
                        onChange={(e) => handleTextChange(e, index)}
                        onBlur={() => setEditingTextIndex(null)} // Exit editing mode on blur
                        autoFocus // Automatically focus when entering the edit mode
                        style={{
                          width: "100%",
                          height: "100%",
                          fontSize: "18px",
                          fontFamily: "Arial",
                          backgroundColor: "transparent",
                          resize: "none",
                          border: "none",
                          outline: "none",
                        }}
                      />
                    </foreignObject>
                  ) : (
                    // Display static text when not editing
                    <Text
                      text={shape.text}
                      x={shape.x + 10}
                      y={shape.y + 10}
                      width={shape.width - 20}
                      height={shape.height - 20}
                      fontSize={18}
                      fontFamily="Arial"
                      fill="black"
                      onDblClick={() => handleTextDoubleClick(index)} // Enter editing mode on double-click
                    />
                  )}
                </Group>

              );
            }
            if (shape.type === "image") {
              return <UploadedImage key={index} src={shape.src} x={shape.x} y={shape.y} />;
            }
            return null;
          })}
        </Layer>
      </Stage>

      <div className="fixed bottom-16">
        <Panel
          handleUploadImage={handleUploadImage}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          handleZoomToFit={handleZoomToFit}
          handleResetCanvas={handleResetCanvas}
          handleRedo={handleRedo}
          handleUndo={handleUndo}
          handleAddStickyNote={handleAddStickyNote}
          handleActivateDrawing={handleActivateDrawing}
          handleToggleArrowMode={handleToggleArrowMode} 
          isDrawingActive={isDrawingActive}
        />
      </div>
    </div>
  );
};

export default InfiniteCanvas;
