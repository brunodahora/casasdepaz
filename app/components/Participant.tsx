import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { colors } from "../constants";

const StyledParticipantContainer = styled.TouchableOpacity`
  width: 100%;
  border-bottom-width: 1px;
  align-items: center;
  justify-content: space-between;
  border-color: ${colors.green};
  flex-direction: row;
  padding: 16px;
`;

const StyledParticipantName = styled.Text`
  font-size: 15px;
  line-height: 18px;
  color: ${props => (props.completed ? colors.green : colors.darkGreen)};
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
`;

const StyledDisciple = styled.Text`
  color: ${colors.purple};
  font-size: 15px;
  line-height: 18px;
  margin-right: 21px;
`;

const onPress = participantId => () => console.log(participantId);

export const Participant = ({ name, participantId }) => (
  <StyledParticipantContainer>
    <StyledParticipantName>{name}</StyledParticipantName>
    <StyledTouchableOpacity onPress={onPress(participantId)}>
      <StyledDisciple>Quero ser discipulado</StyledDisciple>
      <Image
        source={require("assets/images/ic_arrow_forward.png")}
        style={{ width: 18, height: 18, tintColor: colors.purple }}
      />
    </StyledTouchableOpacity>
  </StyledParticipantContainer>
);
