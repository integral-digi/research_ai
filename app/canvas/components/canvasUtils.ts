import React, { useRef, useState, useCallback, useEffect } from "react";
import { Stage, Layer, Rect, Text, Group, Line, Image as KonvaImage } from "react-konva";
import Panel from "./Panel";
import useImage from "use-image";

const UploadedImage = ({ src, x, y }: { src: string; x: number; y: number }) => {
  const [image] = useImage(src);
  return <KonvaImage image={image} x={x} y={y} draggable />;
};

const InfiniteCanvas = () => {
  const [shapes, setShapes] = useState<any[]>([]);
  const [lines, setLines] = useState<any[]>([]);
  const [redoStack, setRedoStack] = useState<any[]>([]);
  const [undoStack, setUndoStack] = useState<any[]>([]);
  const [isDrawingActive, setIsDrawingActive] = useState(false);
  const [editingTextIndex, setEditingTextIndex] = useState<number | null>(null); // To track the currently edited sticky note
  const isDrawing = useRef(false);
  const stageRef = useRef<any>(null);

  const addShape = useCallback((newShape: any) => {
    setShapes((prev) => [...prev, newShape]);
    setUndoStack((prev) => [...prev, { action: "add", shape: newShape }]);
  }, []);


  const handleAddText = useCallback(() => {
    addShape({ type: "text", text: "Text", x: 100, y: 100 });
  }, [addShape]);

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
      text: "New Sticky Note",
      x: 150,
      y: 150,
      width: 200,
      height: 150,
      backgroundColor: "#ffeb3b",
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

  useEffect(() => {
    const handleResize = () => {
      const stage = stageRef.current;
      if (stage) {
        stage.width(window.innerWidth);
        stage.height(window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    // Function to draw grid lines
    const drawGrid = () => {
      const gridSize = 50;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const lines = [];
  
      // Horizontal lines
      for (let i = 0; i < height / gridSize; i++) {
        lines.push(
          <Line
            key={`h${i}`}
            points={[0, i * gridSize, width, i * gridSize]}
            stroke="#ddd"
            strokeWidth={1}
          />
        );
      }
  
      // Vertical lines
      for (let i = 0; i < width / gridSize; i++) {
        lines.push(
          <Line
            key={`v${i}`}
            points={[i * gridSize, 0, i * gridSize, height]}
            stroke="#ddd"
            strokeWidth={1}
          />
        );
      }
  
      return lines;
    };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="w-max bg-slate-100/20 dark:neutral-800/80"
        draggable
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {shapes.map((shape, index) => {
            if (shape.type === "rect") {
              return <Rect key={index} {...shape} />;
            } else if (shape.type === "text") {
              return (
                <Text
                  key={index}
                  text={shape.text}
                  x={shape.x}
                  y={shape.y}
                  draggable
                  fill={shape.isDragging ? "green" : "black"}
                  onDragStart={() => {
                    shape.isDragging = true;
                  }}
                  onDragEnd={(e) => {
                    shape.isDragging = false;
                    shape.x = e.target.x();
                    shape.y = e.target.y();
                    setShapes([...shapes]);
                  }}
                />
              );
            } else if (shape.type === "image") {
              return <UploadedImage key={index} src={shape.src} x={shape.x} y={shape.y} />;
            } else if (shape.type === "stickyNote") {
              return (
                <Group
                  key={index}
                  draggable
                  onDragEnd={(e) => {
                    shape.x = e.target.x();
                    shape.y = e.target.y();
                    setShapes([...shapes]);
                  }}
                >
                  <Rect
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    fill={shape.backgroundColor}
                  />
                  {editingTextIndex === index ? (
                    <foreignObject
                      x={shape.x + 10}
                      y={shape.y + 10}
                      width={shape.width - 20}
                      height={shape.height - 20}
                    >
                      <textarea
                        value={shape.text}
                        onChange={(e) => handleTextChange(e, index)}
                        onBlur={() => setEditingTextIndex(null)}
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
                    <Text
                      text={shape.text}
                      x={shape.x + 10}
                      y={shape.y + 10}
                      width={shape.width - 20}
                      height={shape.height - 20}
                      fontSize={18}
                      fontFamily="Arial"
                      fill="black"
                      onDblClick={() => handleTextDoubleClick(index)}
                    />
                  )}
                </Group>
              );
            }
            return null;
          })}
          <section className="z-0">
            {drawGrid()}
          </section>
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
          handleAddText={handleAddText}
          handleActivateDrawing={handleActivateDrawing}
          isDrawingActive={isDrawingActive}
        />
      </div>
    </div>
  );
};

export default InfiniteCanvas;
