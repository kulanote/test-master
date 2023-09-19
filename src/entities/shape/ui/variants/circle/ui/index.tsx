import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import {
  Circle as KonvaCircleType,
  CircleConfig,
} from "konva/lib/shapes/Circle";
import { Fragment, useEffect, useRef } from "react";
import { Circle as KonvaCircle, Transformer } from "react-konva";

type CustomCircleProps = CircleConfig & {
  isSelected: boolean;
  onSelect: () => void;
  onChange: (attrs: CircleConfig) => void;
};

export const CustomCircle = ({
  isSelected,
  onSelect,
  onChange,
  ...props
}: CustomCircleProps) => {
  const shapeRef = useRef<KonvaCircleType>(null);
  const trRef = useRef<TransformerType>(null);

  useEffect(() => {
    if (!isSelected || !trRef.current || !shapeRef.current) return;

    trRef.current.nodes([shapeRef.current]);
    trRef.current.getLayer()?.batchDraw();
  }, [isSelected]);

  return (
    <Fragment>
      <KonvaCircle
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...props,
            x: e.target.x(),
            y: e.target.y(),
            shapeType: "circle",
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
            shapeType: "circle",
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
