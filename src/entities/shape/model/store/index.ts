import { Shape, ShapeConfig } from "konva/lib/Shape";
import { ShapeDefinition } from "../../ui/types";
import { create } from "zustand";

export const INITIAL_SHAPES: Array<
  ShapeConfig & ShapeDefinition & { id: React.Key }
> = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    id: "rect1",
    shapeType: "square",
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
    id: "rect2",
    shapeType: "square",
  },
  {
    x: 350,
    y: 250,
    radius: 50,
    fill: "green",
    id: "circle1",
    shapeType: "circle",
  },
  {
    x: 100,
    y: 50,
    points: [0, 0, 100, 100],
    stroke: "red",
    tension: 1,
    id: "line1",
    shapeType: "line",
  },
];

type UseShapesStoreProps = {
  shapes: Array<ShapeConfig & ShapeDefinition>;
  selectedShape: (ShapeConfig & ShapeDefinition) | null;
  onChange: (attrs: Shape["attrs"], index: number) => void;
  setSelectedShape: (shape: (ShapeConfig & ShapeDefinition) | null) => void;
  addShape: (shape: ShapeConfig & ShapeDefinition) => void;
};

export const useShapesStore = create<UseShapesStoreProps>((set, store) => ({
  shapes: INITIAL_SHAPES,
  selectedShape: null,
  onChange: (attrs, index) => {
    const { shapes } = store();
    const slicedShapes = [...shapes];
    slicedShapes[index] = attrs;
    set({ shapes: slicedShapes });
  },
  setSelectedShape: (shape) => set({ selectedShape: shape }),
  addShape: (shape) => {
    const { shapes } = store();

    set({ shapes: [...shapes, shape] });
  },
}));
