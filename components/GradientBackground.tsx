// @flow

import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FullScreenContainer } from "./FullScreenContainer";

type Props = {
  colors: Array<string>;
  style?: Object;
  children: JSX.Element;
  direction?: string;
};

export const GradientBackground = ({
  colors,
  children,
  style = [{}],
  direction = "column"
}: Props) => (
  <FullScreenContainer direction={direction}>
    <LinearGradient
      colors={colors}
      style={{
        flex: 1,
        alignItems: "center",
        alignSelf: "stretch",
        ...style[0]
      }}
      start={[0, 0]}
      end={direction === "row" ? [1, 0] : [0, 1]}
    >
      {children}
    </LinearGradient>
  </FullScreenContainer>
);
GradientBackground.defaultProps = {
  direction: "column"
};
