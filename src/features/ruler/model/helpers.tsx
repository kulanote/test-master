import { Line, Text } from "react-konva";
import { GenerateTicksProps } from "./types";

export const TICKS_PERIOD = 30;
export const MIN_TICKS_COUNT = 20;
const TICKS_LENGHT = {
  SMALL: 10,
  BIG: 14,
  GAP: 12,
};
export const SIZER_SIDE = 30;
const PX_LABEL_MIN_COUNT = 5;

export const generateHorizontalTicks = ({
  count,
  side,
  scale,
  start,
}: GenerateTicksProps): JSX.Element[] => {
  const ticks: JSX.Element[] = [];
  const DIVIDER = Math.floor(count / PX_LABEL_MIN_COUNT);
  let tickStroke;
  let tickStrokeWidth;

  for (let i = 1; i <= count; i++) {
    const x = (side / (count - 1)) * i;
    const withText = i % DIVIDER === 0;
    const tickLength = withText ? TICKS_LENGHT.BIG : TICKS_LENGHT.SMALL;
    tickStroke = "gray";
    tickStrokeWidth = 1;

    if (withText) {
      tickStrokeWidth = 3;
    }

    ticks.push(
      <Line
        key={`h-${i}`}
        points={[x, 0, x, tickLength]}
        stroke={tickStroke}
        strokeWidth={tickStrokeWidth}
      />
    );

    if (withText) {
      const value = Number(Number(String(start).slice(1)) / scale + x) / scale;

      const labelText = `${value.toFixed()}px`;
      ticks.push(
        <Text
          key={`h-t-${i}`}
          text={labelText}
          x={x - TICKS_LENGHT.GAP}
          y={tickLength + 5}
          fontSize={10}
        />
      );
    }
  }

  return ticks;
};

export const generateVerticalTicks = ({
  count,
  side,
  start,
  scale,
}: GenerateTicksProps): JSX.Element[] => {
  const ticks: JSX.Element[] = [];
  const DIVIDER = Math.floor(count / PX_LABEL_MIN_COUNT);
  let tickStroke;
  let tickStrokeWidth;

  for (let i = 1; i <= count; i++) {
    const y = (side / (count - 1)) * i;
    const withText = i % DIVIDER === 0;
    const tickLength = withText ? TICKS_LENGHT.BIG : TICKS_LENGHT.SMALL;
    tickStroke = "gray";
    tickStrokeWidth = 1;

    if (withText) {
      tickStrokeWidth = 3;
    }

    ticks.push(
      <Line
        key={`v-${i}`}
        points={[0, y, tickLength, y]}
        stroke={tickStroke}
        strokeWidth={tickStrokeWidth}
      />
    );

    if (withText) {
      const labelText = `${(
        Number(Number(String(start).slice(1)) / scale + y) / scale
      ).toFixed()}px`;

      ticks.push(
        <Text
          key={`v-t-${i}`}
          text={labelText}
          y={y - 12}
          x={25}
          fontSize={10}
          rotation={90}
        />
      );
    }
  }

  return ticks;
};
