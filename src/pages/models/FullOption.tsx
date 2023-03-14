import React, { useState } from "react";
import {
  PieChart,
  pieChartDefaultProps,
  PieChartProps,
} from "react-minimal-pie-chart";
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "500" });

function FullOption(props: PieChartProps) {
  const [hovered, setHovered] = useState<number | undefined>(undefined);
  const [selected, setSelected] = useState<number | undefined>(0);

  const data = props.data.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: "pink",
      };
    }
    return entry;
  });

  const lineWidth = 60;

  return (
    <PieChart
      style={{
        fontFamily: poppins.style.fontFamily + ", sans-serif",
        fontSize: "10px",
      }}
      data={data}
      radius={pieChartDefaultProps.radius - 10}
      // radius={30}
      lineWidth={60}
      segmentsStyle={{ transition: "stroke .3s" }}
      segmentsShift={(index) => 1}
      // animate
      label={({ dataEntry }) => dataEntry.title}
      labelPosition={100 - lineWidth / 2}
      labelStyle={{
        fill: "#000",
        fontSize: "5px",
        opacity: 0.75,
        pointerEvents: "none",
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
      onClick={(_, index) => {
        setSelected(index === selected ? undefined : index);
      }}
    />
  );
}

export default FullOption;
