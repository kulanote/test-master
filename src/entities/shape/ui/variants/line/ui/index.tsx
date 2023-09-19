import { Fragment, useEffect, useRef } from "react";
import { Line as KonvaLine, Transformer } from "react-konva";
import { Line as KonvaLineType, LineConfig } from "konva/lib/shapes/Line";
import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";

type CustomLineProps = LineConfig & {
  isSelected: boolean;
  onSelect: () => void;
  onChange: (attrs: LineConfig) => void;
};

export const CustomLine = ({
  isSelected,
  onSelect,
  onChange,
  ...props
}: CustomLineProps) => {
  const shapeRef = useRef<KonvaLineType>(null);
  const trRef = useRef<TransformerType>(null);

  useEffect(() => {
    if (!isSelected || !trRef.current || !shapeRef.current) return;

    trRef.current.nodes([shapeRef.current]);
    trRef.current.getLayer()?.batchDraw();
  }, [isSelected]);

  return (
    <Fragment>
      <KonvaLine
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...props,
            points: e.target.points(),
            shapeType: "line",
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
            points: node
              .points()
              .map((point, index) =>
                index % 2 === 0 ? point * scaleX : point * scaleY,
              ),
            shapeType: "line",
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
