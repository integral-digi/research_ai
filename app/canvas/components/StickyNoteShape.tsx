import { Rect, Text } from 'react-konva';

const StickyNoteShape = ({ shape, onDragEnd }: any) => (
  <>
    <Rect
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      fill={shape.backgroundColor}
      draggable
      onDragEnd={(e) => onDragEnd(e.target.x(), e.target.y())}
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
      draggable
      onDragEnd={(e) => onDragEnd(e.target.x(), e.target.y())}
    />
  </>
);

export default StickyNoteShape;
