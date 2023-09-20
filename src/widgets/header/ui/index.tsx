/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Dropdown } from "antd";
import { BsSquare, BsCircle } from "react-icons/bs";
import { AiOutlineLine } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import React, { useMemo, useState } from "react";
import { useShapesStore } from "@/entities/shape/model/store";
import { Scaler } from "@/features/scaler";
import { getRandomColor } from "@/shared/helpers/get-random-color";

export const Header = () => {
  const [activeItem, setActiveItem] = useState(0);

  const addShape = useShapesStore((store) => store.addShape);

  const items = useMemo(
    () => [
      {
        label: "Rect",
        key: "0",
        icon: <BsSquare />,
        onClick: () => {
          setActiveItem(0);
          addShape({
            x: 100,
            y: 100,
            width: 100,
            height: 100,
            fill: getRandomColor(),
            id: (Math.random() * 1000000).toString(16),
            shapeType: "square",
          });
        },
      },
      {
        label: "Circle",
        key: "1",
        icon: <BsCircle />,
        onClick: () => {
          setActiveItem(1);
          addShape({
            x: 100,
            y: 100,
            width: 100,
            height: 100,
            fill: getRandomColor(),
            id: (Math.random() * 1000000).toString(16),
            shapeType: "circle",
          });
        },
      },
      {
        label: "Line",
        key: "2",
        icon: <AiOutlineLine />,
        danger: true,
        onClick: () => {
          setActiveItem(2);
          addShape({
            x: 100,
            y: 100,
            points: [0, 0, 50, 50],
            stroke: getRandomColor(),
            tension: 5,
            width: 5,
            id: (Math.random() * 1000000).toString(16),
            shapeType: "line",
          });
        },
      },
    ],
    []
  );

  return (
    <div className="py-5 px-10 bg-black text-white flex justify-between gap-5">
      <div className="flex flex-row gap-5 w-full justify-start items-center">
        <span className="">Фигурки:</span>
        <Dropdown.Button
          rootClassName="text-white border-white"
          style={{ color: "white" }}
          menu={{ items }}
          buttonsRender={([_, rightButton]) => [
            <Button
              className="text-white"
              onClick={() => {
                items[activeItem].onClick();
              }}
            >
              {items[activeItem]?.icon}
            </Button>,
            React.cloneElement(
              rightButton as React.ReactElement<unknown, string>,
              {}
            ),
          ]}
          placement="bottom"
          icon={<BiChevronDown className="fill-white" />}
        ></Dropdown.Button>
      </div>
      <Scaler />
    </div>
  );
};
