import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { colors } from "../constants";

const StyledTouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
`;

const StyledDisciple = styled.Text`
  color: ${colors.purple};
  font-size: 15px;
  line-height: 18px;
  margin-right: 21px;
`;

export const DiscipleshipAction = ({ participantId, onPress }) => (
  <StyledTouchableOpacity onPress={onPress(participantId)}>
    <StyledDisciple>Quero ser discipulado</StyledDisciple>
    <Image
      source={require("assets/images/ic_arrow_forward.png")}
      style={{ width: 18, height: 18, tintColor: colors.purple }}
    />
  </StyledTouchableOpacity>
);
