export type RulerRenderProps = {
  rulerProps: {
    height: number;
    width: number;
  };
  pxlsProps: {
    startX: number;
    startY: number;
    height: number;
    width: number;
    scale: number;
  };
};

export type GenerateTicksProps = {
  count: number;
  side: number;
  start: number;
  scale: number;
};
