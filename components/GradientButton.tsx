import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

type Props = {
  colors: Array<string>;
  title: string;
  style?: object;
  textColor: string;
  onPress: () => void;
};

const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  background-color: transparent;
  font-size: 23px;
  color: ${props => props.textColor};
`;

const StyledLinearGradient = styled(LinearGradient)`
  width: 100%;
  margin: 5px 0;
  padding: 18px;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  shadow-opacity: 0.75;
  shadow-radius: 6px;
  shadow-color: black;
  shadow-offset: 2px 2px;
`;

export const GradientButton = ({ colors, title, textColor, onPress }) => (
  <StyledTouchableOpacity style={{ width: "100%" }} onPress={onPress}>
    <StyledLinearGradient colors={colors} start={[0, 0]} end={[1, 0]}>
      <StyledText textColor={textColor}>{title}</StyledText>
    </StyledLinearGradient>
  </StyledTouchableOpacity>
);
