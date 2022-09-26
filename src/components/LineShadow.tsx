import React from "react";
import { Path } from "react-native-svg";

interface LineProps {
  line: string;
}

export const LineShadow = (props: Partial<LineProps>) => {
  const { line } = props as LineProps;
  return (
    <Path
      key={"shadow"}
      y={2}
      x={1}
      d={line}
      fill={"none"}
      strokeWidth={3}
      stroke={"#0091EA"}
    />
  );
};
