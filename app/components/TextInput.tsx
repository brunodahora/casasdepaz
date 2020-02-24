import React from "react";
import styled from "styled-components/native";
import { colors, fontWeight } from "../constants";

type Props = {
  label: string;
  value: string;
  onChangeText: (string) => void;
  secureTextEntry?: boolean;
  keyboardType?: string;
  error?: string;
};

const StyledLabel = styled.Text`
  font-size: 14px;
  font-weight: ${fontWeight.light};
  line-height: 16px;
  color: ${props => (props.error ? colors.red : colors.green)};
`;

const StyledError = styled(StyledLabel)`
  color: ${colors.red};
  margin-top: 8px;
  margin-bottom: 12px;
`;

const StyledTextInput = styled.TextInput`
  color: ${props => (props.error ? colors.red : colors.darkGreen)};
  font-size: 18px;
  padding: 12px;
`;

const StyledHR = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${props => (props.error ? colors.red : colors.green)};
  border-radius: 0.5px;
  margin-bottom: ${props => (props.error ? "0px" : "14px")};
`;

export const TextInput = ({ label, error, ...otherProps }: Props) => (
  <>
    <StyledLabel error={error}>{label}</StyledLabel>
    <StyledTextInput
      {...otherProps}
      error={error}
      selectionColor={colors.darkGreen}
      underlineColorAndroid="transparent"
    />
    <StyledHR error={error} />
    {error && <StyledError>{error}</StyledError>}
  </>
);
