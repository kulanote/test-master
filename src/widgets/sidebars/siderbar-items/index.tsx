import { useShapesStore } from "@/entities/shape/model/store";
import { Button } from "antd";

export const SidebarItems = () => {
  const [shapes, setSelectedShape] = useShapesStore((store) => [
    store.shapes,
    store.setSelectedShape,
  ]);

  return (
    <div className="bg-green-200 h-full">
      <h2>Ваши фигурки</h2>
      <ul>
        {shapes.map((shape) => (
          <li>
            <Button
              onClick={() => {
                setSelectedShape(shape);
              }}
            >
              <span>{shape.shapeType}: </span>
              <span>{shape.id}</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
