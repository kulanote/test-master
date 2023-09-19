import { useEffect, useRef, useState } from "react";
import { SIZER_SIDE } from "../../../features/ruler/model/helpers";
import { useShapesStore } from "../../../entities/shape/model/store";
import { KonvaEventObject } from "konva/lib/Node";

export const useArea = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [areaSize, setAreaSize] = useState({ width: 0, height: 0 });

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const updateElementSize = () => {
    if (elementRef.current) {
      const boundingBox = elementRef.current.getBoundingClientRect();
      setAreaSize({
        width: boundingBox.width - SIZER_SIDE - 1,
        height: boundingBox.height - SIZER_SIDE - 1,
      });
    }
  };

  useEffect(() => {
    updateElementSize();
    window.addEventListener("resize", updateElementSize);

    return () => {
      window.removeEventListener("resize", updateElementSize);
    };
  }, []);

  const setSelectedShape = useShapesStore((store) => store.setSelectedShape);

  const checkDeselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedShape(null);
    }
  };

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    const newX = Math.min(0, e.target.x());
    const newY = Math.min(0, e.target.y());

    setPosition({ x: newX, y: newY });
  };

  return {
    elementRef,
    handleDragMove,
    checkDeselect,
    position,
    areaSize,
  };
};
