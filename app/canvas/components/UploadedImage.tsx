import React from 'react';
import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

interface UploadedImageProps {
  src: string;
  x: number;
  y: number;
}

const UploadedImage: React.FC<UploadedImageProps> = ({ src, x, y }) => {
  const [image] = useImage(src);

  return <KonvaImage image={image} x={x} y={y} draggable />;
};

export default UploadedImage;
