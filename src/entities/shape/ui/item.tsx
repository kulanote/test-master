import { CustomRect } from "./variants/rect";
import { CustomCircle } from "./variants/circle";
import { ShapeCreatorProps } from "./types";
import { CustomLine } from "./variants/line";

export const ShapeCreator = ({
  shapeType,
  ...props
}: ShapeCreatorProps<unknown>) => {
  if (shapeType === "square") {
    return <CustomRect {...props} />;
  }
  if (shapeType === "circle") {
    return <CustomCircle {...props} />;
  }
  if (shapeType === "line") {
    return <CustomLine {...props} />;
  }

  return null;
};
