import { useMemo } from "react";
import { Stage, Layer, Rect } from "react-konva";
import {
  MIN_TICKS_COUNT,
  TICKS_PERIOD,
  generateHorizontalTicks,
  generateVerticalTicks,
} from "../model/helpers";
import { RulerRenderProps } from "../model/types";

export const SIZER_SIDE = 30;

export const Ruler = ({
  rulerProps: { height, width },
  pxlsProps,
}: RulerRenderProps) => {
  const count_ticks_y = useMemo(
    () => Math.max(height / TICKS_PERIOD, MIN_TICKS_COUNT),
    [height],
  );
  const count_ticks_x = useMemo(
    () => Math.max(width / TICKS_PERIOD, MIN_TICKS_COUNT),
    [width],
  );

  const verticalTicks = useMemo(
    () =>
      generateVerticalTicks({
        scale: pxlsProps.scale,
        count: count_ticks_y,
        side: height - SIZER_SIDE,
        start: pxlsProps?.startY * pxlsProps.scale,
      }),
    [count_ticks_y, pxlsProps?.startY, pxlsProps?.scale],
  );
  const horizontalTicks = useMemo(
    () =>
      generateHorizontalTicks({
        scale: pxlsProps.scale,
        count: count_ticks_x,
        side: width,
        start: pxlsProps?.startX * pxlsProps.scale,
      }),
    [count_ticks_x, pxlsProps?.startX, pxlsProps?.scale],
  );

  return (
    <>
      <div className="y_sizer">
        <Stage width={SIZER_SIDE} height={height}>
          <Layer>
            <Rect width={SIZER_SIDE} height={height} fill="#f0f0f0" />
            {verticalTicks}
            {horizontalTicks}
          </Layer>
        </Stage>
      </div>
      <div className="x_sizer">
        <Stage width={width + SIZER_SIDE} height={SIZER_SIDE}>
          <Layer>
            <Rect
              width={width + SIZER_SIDE}
              height={SIZER_SIDE}
              fill="#f0f0f0"
            />
            {verticalTicks}
            {horizontalTicks}
          </Layer>
        </Stage>
      </div>
    </>
  );
};
