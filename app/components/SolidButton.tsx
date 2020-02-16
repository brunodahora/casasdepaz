import React from "react";
import { Dimensions, Platform } from "react-native";
import styled from "styled-components/native";

type Props = {
  onPress: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
  color: string;
  textColor?: string;
  transparent?: boolean;
};

const StyledContainer = styled.View`
  width: 100%;
  align-items: center;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  width: ${Platform.OS === "web" && Dimensions.get("window").width > 500
    ? "500px"
    : "100%"};
  margin: 5px 0;
  padding: 18px;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.transparent ? "transparent" : props.color};
  border-radius: 32px;
  border-color: ${props => props.color};
  border-width: ${props => (props.transparent ? "2px" : "0")};
  flex-direction: row;
`;

const StyledText = styled.Text`
  color: ${props => (props.transparent ? props.color : props.textColor)};
  font-size: 23px;
  margin-left: ${props => (props.hasIcon ? "8px" : "0")};
`;

export const SolidButton = ({ title, icon, ...otherProps }: Props) => (
  <StyledContainer>
    <StyledTouchableOpacity {...otherProps}>
      {icon}
      <StyledText hasIcon={icon} {...otherProps}>
        {title}
      </StyledText>
    </StyledTouchableOpacity>
  </StyledContainer>
);
SolidButton.defaultProps = {
  transparent: false
};
