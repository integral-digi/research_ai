"use client"
import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

const InfiniteCanvas = () => {
  const [shapes, setShapes] = useState<{ id: number; rect: any; color: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedShape, setSelectedShape] = useState<number | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleCanvasClick = (e) => {
    const rect = {
      x: e.evt.clientX - 50,
      y: e.evt.clientY - 50,
      width: 100,
      height: 100,
    };
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    setShapes((prevShapes) => [...prevShapes, { id: prevShapes.length, rect, color }]);
  };

  const handleMouseDown = (e: any) => {
    const clickedX = e.evt.clientX;
    const clickedY = e.evt.clientY;

    const shapeIndex = shapes.findIndex((shape) => {
      const { x, y, width, height } = shape.rect;
      return clickedX >= x && clickedX <= x + width && clickedY >= y && clickedY <= y + height;
    });

    if (shapeIndex !== -1) {
      setSelectedShape(shapeIndex);
      setOffset({
        x: clickedX - shapes[shapeIndex].rect.x,
        y: clickedY - shapes[shapeIndex].rect.y,
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && selectedShape !== null) {
      const newShapes = shapes.map((shape, index) => {
        if (index === selectedShape) {
          return {
            ...shape,
            rect: {
              x: e.evt.clientX - offset.x,
              y: e.evt.clientY - offset.y,
              width: shape.rect.width,
              height: shape.rect.height,
            },
          };
        }
        return shape;
      });

      setShapes(newShapes);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setSelectedShape(null);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {shapes.map((shape) => (
          <Rect
            key={shape.id}
            x={shape.rect.x}
            y={shape.rect.y}
            width={shape.rect.width}
            height={shape.rect.height}
            fill={shape.color}
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default InfiniteCanvas;