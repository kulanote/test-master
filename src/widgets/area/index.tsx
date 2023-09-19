import { Stage, Layer, Group } from "react-konva";
import { ShapeList } from "@/entities/shape/ui/list";
import { useScale } from "@/features/scaler/model/use-scale";
import { Ruler } from "@/features/ruler";
import { PixelGrid } from "@/features/grid";
import { useArea } from "./model/use-area";

import "./styles.scss";

export type Position = {
  x: number;
  y: number;
  heightAfterScroll: number;
  widthAfterScroll: number;
};

export type RulerProps = {
  width: number;
  height: number;
  lastPos: {
    x: number;
    y: number;
  };
};

const PAINT_RECT_SIDE = 10000;

export const PaintArea = () => {
  const { scale, handleWheel } = useScale();
  const { elementRef, areaSize, checkDeselect, handleDragMove, position } =
    useArea();

  return (
    <div className="w-full h-full paint__area__wrapper" ref={elementRef}>
      <Ruler
        rulerProps={{ height: areaSize.height, width: areaSize.width }}
        pxlsProps={{
          startX: position.x,
          startY: position.y,
          height: areaSize.height,
          width: areaSize.width,
          scale,
        }}
      />
      <div className="paint__area cursor-grab border-l border-t border-slate-600">
        <Stage
          width={areaSize.width}
          height={areaSize.height}
          scaleX={scale}
          scaleY={scale}
          className="cursor-grab"
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          draggable
          fill="#b0b0b0"
          x={position.x}
          y={position.y}
          onWheel={handleWheel}
          onDragMove={handleDragMove}
          dragBoundFunc={(pos) => {
            const newX = Math.min(
              0,
              Math.max(pos.x, areaSize.width - PAINT_RECT_SIDE)
            );
            const newY = Math.min(
              0,
              Math.max(pos.y, areaSize.height - PAINT_RECT_SIDE)
            );
            return { x: newX, y: newY };
          }}
        >
          <Layer>
            <Group>
              <ShapeList />
            </Group>
            <PixelGrid
              height={areaSize.height}
              width={areaSize.width}
              scale={scale}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
