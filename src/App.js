import React from "react";
import { VictoryChart, VictoryScatter, VictoryLine } from "victory";
import { times, sortBy } from "lodash";
import chroma from "chroma-js";
import sapc from "./sapc";

export default function App() {
  const cols = times(200).map(i => chroma.random());
  const data1 = cols.map(col => ({
    x: col.lch()[0],
    y: col.luminance(),
    color: col.hex()
  }));
  const data2 = cols.map(col => ({
    x: col.lch()[0],
    y: -sapc([0, 0, 0], col.rgb()),
    color: col.hex()
  }));
  console.log(
    sortBy(data2, "x")
      .map(({ x, y }) => [x, y].join(","))
      .join("\n")
  );
  const fit1 = times(200).map(i => {
    const x = i / 2;
    return { x, y: Math.pow((x + 16) / 116, 3) };
  });
  const fit2 = times(11).map(i => {
    const x = i * 10;
    return { x, y: 0.016 * x - 0.05 };
  });
  return (
    <div className="App">
      <VictoryChart domain={{ x: [0, 100], y: [-0.6, 1.5] }}>
        <VictoryScatter
          style={{ data: { fill: ({ datum }) => datum.color } }}
          size={1.5}
          data={data1}
        />
        <VictoryLine
          data={fit1}
          interpolation="natural"
          style={{ data: { stroke: "rgba(0,0,0,0.2)", strokeWidth: 1 } }}
        />
        <VictoryScatter
          style={{ data: { fill: ({ datum }) => datum.color } }}
          size={1.5}
          data={data2}
        />
        <VictoryLine
          data={fit2}
          interpolation="natural"
          style={{ data: { stroke: "rgba(0,0,0,0.2)", strokeWidth: 1 } }}
        />
      </VictoryChart>
    </div>
  );
}
