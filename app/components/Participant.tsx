import React from "react";
import styled from "styled-components/native";
import { colors } from "../constants";

const StyledParticipantContainer = styled.View`
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

export const Participant = ({
  name,
  participantId,
  renderAction,
  ...otherProps
}) => (
  <StyledParticipantContainer>
    <StyledParticipantName>{name}</StyledParticipantName>
    {renderAction && renderAction({ participantId, ...otherProps })}
  </StyledParticipantContainer>
);
