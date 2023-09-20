import { ShapeCreator } from "./item";
import { useShapesStore } from "../model/store";
import { KonvaEventObject } from "konva/lib/Node";

const PAINT_RECT_SIDE = 10000;

export const ShapeList = () => {
  const [shapes, onChange, selectedShape, setSelectedShape] = useShapesStore(
    (store) => [
      store.shapes,
      store.onChange,
      store.selectedShape,
      store.setSelectedShape,
    ]
  );

  const handleElementDragMove = (e: KonvaEventObject<DragEvent>) => {
    const elementX = e.target.x();
    const elementY = e.target.y();
    const validX = Math.min(
      PAINT_RECT_SIDE,
      Math.max(elementX, e.target.attrs.radius || 0)
    );
    const validY = Math.min(
      PAINT_RECT_SIDE,
      Math.max(elementY, e.target.attrs.radius || 0)
    );

    e.target.setAttrs({ x: validX, y: validY });
  };

  return shapes.map((shape, index) => (
    <ShapeCreator
      key={shape.id}
      {...shape}
      isSelected={shape.id === selectedShape?.id}
      onSelect={() => {
        setSelectedShape(shape);
      }}
      onDragMove={handleElementDragMove}
      onChange={(newAttrs) => {
        onChange(newAttrs, index);
      }}
    />
  ));
};
