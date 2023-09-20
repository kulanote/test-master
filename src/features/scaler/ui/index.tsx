import { useStoreScale } from "../model/store";

export const Scaler = () => {
  const scale = useStoreScale((store) => store.scale);

  return (
    <div className="bg-white text-black px-3 py-2">
      {(scale * 100).toFixed()}%
    </div>
  );
};
