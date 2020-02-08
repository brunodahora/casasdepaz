import React from "react";
import styled from "styled-components/native";
import { colors, fontWeight } from "../constants";

type Props = {
  label: string;
  value: string;
  onChangeText: (string) => void;
  secureTextEntry?: boolean;
  keyboardType?: string;
};

const StyledLabel = styled.Text`
  font-size: 14px;
  font-weight: ${fontWeight.light};
  line-height: 16px;
  color: ${colors.green};
`;

const StyledTextInput = styled.TextInput`
  color: ${colors.darkGreen};
  font-size: 18px;
  padding: 12px;
`;

const StyledHR = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.green};
  border-radius: 0.5px;
  margin-bottom: 12px;
`;

export const TextInput = ({ label, ...otherProps }: Props) => (
  <>
    <StyledLabel>{label}</StyledLabel>
    <StyledTextInput
      {...otherProps}
      selectionColor={colors.darkGreen}
      underlineColorAndroid="transparent"
    />
    <StyledHR />
  </>
);
