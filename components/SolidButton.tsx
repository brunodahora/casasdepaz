import React from "react";
import styled from "styled-components/native";

type Props = {
  onPress: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
  color: string;
  textColor?: string;
  transparent?: boolean;
};

const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  margin: 5px 0;
  padding: 18px;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.transparent ? "transparent" : props.color};
  border-radius: 32px;
  border-color: ${props => props.color};
  border-width: ${props => (props.transparent ? "2px" : "0")};
`;

const StyledText = styled.Text`
  color: ${props => (props.transparent ? props.color : props.textColor)};
  font-size: 23px;
`;

export const SolidButton = ({ title, ...otherProps }: Props) => (
  <StyledTouchableOpacity {...otherProps}>
    <StyledText {...otherProps}>{title}</StyledText>
  </StyledTouchableOpacity>
);
SolidButton.defaultProps = {
  transparent: false
};
