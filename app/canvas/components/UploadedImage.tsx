import { Image } from "react-konva";
import useImage from "use-image";

export const UploadedImage = ({ src, x, y }: { src: string; x: number; y: number }) => {
  const [image] = useImage(src);
  return <Image image={image} x={x} y={y} draggable />;
};
