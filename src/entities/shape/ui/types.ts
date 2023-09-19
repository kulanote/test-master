import { ShapeConfig } from "konva/lib/Shape";

export type ShapeTransformProps<T> = {
  isSelected: boolean;
  onSelect: () => void;
  onChange: (attrs: T) => void;
};

export type ShapeDefinition = {
  shapeType: "circle" | "square" | "line";
};

export type ShapeCreatorProps<T> = ShapeConfig &
  ShapeTransformProps<T> &
  ShapeDefinition;

export type ShapeListProps<T = unknown> = {
  shapes: ShapeCreatorProps<T>[];
} & Record<string, unknown>;
