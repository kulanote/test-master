import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import { RectConfig, Rect as RectType } from "konva/lib/shapes/Rect";
import { Fragment, useEffect, useRef } from "react";
import { Rect as KonvaRect, Transformer } from "react-konva";

type CustomRestProps = RectConfig & {
  isSelected: boolean;
  onSelect: () => void;
  onChange: (attrs: RectConfig) => void;
};

export const CustomRect = ({
  isSelected,
  onSelect,
  onChange,
  ...props
}: CustomRestProps) => {
  const shapeRef = useRef<RectType>(null);
  const trRef = useRef<TransformerType>(null);

  useEffect(() => {
    if (!isSelected || !trRef.current || !shapeRef.current) return;

    trRef.current.nodes([shapeRef.current]);
    trRef.current.getLayer()?.batchDraw();
  }, [isSelected]);

  return (
    <Fragment>
      <KonvaRect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...props,
            x: e.target.x(),
            y: e.target.y(),
            shapeType: "square",
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (!node) return;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);

          node.scaleY(1);
          onChange({
            ...props,
            shapeType: "square",
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
        {...props}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Fragment>
  );
};
