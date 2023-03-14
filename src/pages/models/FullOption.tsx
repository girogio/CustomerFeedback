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

  const data = props.data.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: "grey",
      };
    }
    return entry;
  });

  const lineWidth = 60;

  return (
    <PieChart
      style={{
        fontFamily: poppins.style.fontFamily + ", sans-serif",
        fontSize: "50px",
      }}
      data={data}
      // radius={pieChartDefaultProps.radius - 6}
      radius={30}
      lineWidth={60}
      segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
      segmentsShift={(index) => (hovered === index ? 6 : 1)}
      animate
      label={({ dataEntry }) => dataEntry.title}
      labelPosition={100 - lineWidth / 2}
      labelStyle={{
        fill: "#000",
        fontSize: "2px",
        opacity: 0.75,
        pointerEvents: "none",
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
    />
  );
}

export default FullOption;
