import React from "react";
import { Rect, Text } from "react-konva";
import UploadedImage from "./UploadedImage";

const CanvasShapes = ({ shapes, setShapes }: { shapes: any[]; setShapes: any }) => {
  return (
    <>
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
              onDragEnd={(e) => {
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
            <>
              <Rect
                key={index}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                fill={shape.backgroundColor}
                draggable
                onDragEnd={(e) => {
                  shape.x = e.target.x();
                  shape.y = e.target.y();
                  setShapes([...shapes]);
                }}
              />
              <Text
                text={shape.text}
                x={shape.x + 10}
                y={shape.y + 10}
                fontSize={18}
                width={shape.width - 20}
                height={shape.height - 20}
                draggable
              />
            </>
          );
        }
        return null;
      })}
    </>
  );
};

export default CanvasShapes;
