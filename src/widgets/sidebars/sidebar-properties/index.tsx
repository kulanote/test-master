import { useShapesStore } from "@/entities/shape/model/store";

export const SidebarProperties = () => {
  const selectedShape = useShapesStore((store) => store.selectedShape);

  return (
    <div className="bg-red-300 p-4">
      {selectedShape ? (
        <>
          <h2>Аттрибуты вашей фигуры:</h2>
          <ul>
            {Object.entries(selectedShape).map(([k, v]) => (
              <li>
                <span>{k}: </span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h2>Выберите фигуру</h2>
      )}
    </div>
  );
};
