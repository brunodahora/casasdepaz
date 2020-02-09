import React from "react";
import styled from "styled-components/native";
import { colors, fontWeight } from "../constants";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  selectedValue: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
  error?: string;
  options: Array<Option>;
  placeholder?: Option;
};

const StyledLabel = styled.Text`
  font-size: 14px;
  font-weight: ${fontWeight.light};
  line-height: 16px;
  color: ${props => (props.error ? colors.red : colors.green)};
`;

const StyledError = styled(StyledLabel)`
  color: ${colors.red};
  margin-bottom: 12px;
`;

const StyledPicker = styled.Picker`
  color: ${props => (props.error ? colors.red : colors.darkGreen)};
  font-size: 18px;
  padding: 12px;
`;

const StyledHR = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${props => (props.error ? colors.red : colors.green)};
  border-radius: 0.5px;
  margin-bottom: 12px;
`;

export const Picker = ({
  label,
  error,
  placeholder = null,
  options = [],
  ...otherProps
}: Props) => (
  <>
    <StyledLabel error={error}>{label}</StyledLabel>
    <StyledPicker {...otherProps} error={error}>
      {placeholder && (
        <StyledPicker.Item
          key={placeholder.label}
          label={placeholder.label}
          value={placeholder.value}
        />
      )}
      {options.map(({ label, value }) => (
        <StyledPicker.Item key={label} label={label} value={value} />
      ))}
    </StyledPicker>
    <StyledHR error={error} />
    {error && <StyledError>{error}</StyledError>}
  </>
);
