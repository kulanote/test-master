import { useEffect, useState } from "react";
import { useStoreScale } from "./store";
import { KonvaEventObject } from "konva/lib/Node";

export const useScale = () => {
  const { scale, setScale } = useStoreScale();
  const [ctrlPressed, setCtrlPressed] = useState(false);

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    if (!ctrlPressed) return;

    setScale(e.evt.deltaY);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setCtrlPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setCtrlPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { scale, handleWheel };
};
