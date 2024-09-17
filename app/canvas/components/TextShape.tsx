import { Text } from 'react-konva';

const TextShape = ({ shape, onDragEnd }:any) => (
  <Text
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
      onDragEnd(e.target.x(), e.target.y());
    }}
  />
);

export default TextShape;
