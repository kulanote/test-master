import { create } from "zustand";
import { clampedScales } from "./helpers";

type UseScalerStoreProps = {
  scale: number;
  setScale: (delta: number) => void;
};

export const useStoreScale = create<UseScalerStoreProps>((set, store) => ({
  scale: 1,
  setScale: (delta) => {
    const { scale: oldScale } = store();
    const newScale = clampedScales(oldScale, delta);

    if (!newScale) return;
    set({ scale: newScale });
  },
}));
