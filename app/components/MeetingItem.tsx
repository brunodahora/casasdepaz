import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { colors } from "../constants";

const StyledMeetingContainer = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  align-items: center;
  justify-content: space-between;
  border-color: ${colors.green};
  flex-direction: row;
  padding: 16px;
`;

const StyledMeetingText = styled.Text`
  font-size: 15px;
  line-height: 18px;
  color: ${props => (props.completed ? colors.green : colors.darkGreen)};
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
`;

const StyledBegin = styled.Text`
  color: ${colors.purple};
  font-size: 15px;
  line-height: 18px;
  margin-right: 21px;
`;

export const MeetingItem = ({ id, completed, onPress }) => (
  <StyledMeetingContainer>
    <StyledMeetingText completed={completed}>{`Encontro ${id +
      1}/5`}</StyledMeetingText>
    <StyledTouchableOpacity onPress={onPress}>
      {completed ? (
        <StyledMeetingText completed={completed}>Concluído</StyledMeetingText>
      ) : (
        <>
          <StyledBegin>Iniciar</StyledBegin>
          <Image
            source={require("assets/images/ic_arrow_forward.png")}
            style={{ width: 18, height: 18, tintColor: colors.purple }}
          />
        </>
      )}
    </StyledTouchableOpacity>
  </StyledMeetingContainer>
);
