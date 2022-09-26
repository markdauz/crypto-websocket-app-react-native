import React from "react";
import { StyleSheet, View } from "react-native";
import * as shape from "d3-shape";
import { LineChart } from "react-native-svg-charts";
import { LineShadow } from "./LineShadow";

type ChartProps = {
  height?: number;
  width?: number;
  prices: any;
};

const Chart = (props: ChartProps) => {
  const { prices, height = 50, width = 120 } = props;
  const numPrices = prices?.map((price: any) => parseFloat(price));
  return (
    <View style={{ width, backgroundColor: "rgba(36, 105, 240,0.1)" }}>
      <LineChart
        style={[styles.chart, { height }]}
        data={numPrices.slice(0, 20)}
        svg={{ stroke: styles.chart.color }}
        contentInset={{ top: 20, bottom: 20 }}
        curve={shape.curveBasis}
      >
        <LineShadow />
      </LineChart>
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    height: 50,
    color: "#0091EA",
  },
});

export default Chart;
