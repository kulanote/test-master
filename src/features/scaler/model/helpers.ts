const SCALE_BORDERS = {
  MIN: 0.05,
  MAX: 20,
};

export const clampedScales = (scale: number, delta: number) => {
  const scaleBy = 1.2;

  const oldScale = scale;

  if (oldScale === SCALE_BORDERS.MAX && delta > 0) return;

  if (oldScale === SCALE_BORDERS.MIN && delta < 0) return;

  const newScale = delta > 0 ? oldScale * scaleBy : oldScale / scaleBy;

  if (newScale > SCALE_BORDERS.MAX) {
    return SCALE_BORDERS.MAX;
  }

  if (newScale < SCALE_BORDERS.MIN) {
    return SCALE_BORDERS.MIN;
  }

  return newScale;
};
