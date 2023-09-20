import { Line } from "react-konva";

type PixelGridProps = {
  width: number;
  height: number;
  scale: number;
};

export const PixelGrid = ({ width, height, scale }: PixelGridProps) => {
  const gridSize = 1;

  const lines = [];

  if (scale < 8) return;

  for (let y = 0; y < height; y += gridSize) {
    lines.push(
      <Line
        points={[0, y, width, y]}
        stroke="#f5f5dc"
        strokeWidth={0.07}
        key={`h-line-${y}`}
      />,
    );
  }

  for (let x = 0; x < width; x += gridSize) {
    lines.push(
      <Line
        points={[x, 0, x, height]}
        stroke="#f5f5dc"
        strokeWidth={0.07}
        key={`v-line-${x}`}
      />,
    );
  }

  return <>{lines}</>;
};
