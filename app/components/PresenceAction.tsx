import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { colors } from "../constants";

const StyledTouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
`;

export const PresenceAction = ({ participantId, presence, onPress }) => (
  <StyledTouchableOpacity onPress={onPress(participantId)}>
    {presence[participantId] ? (
      <Image
        tintColor={colors.purple}
        source={require(`assets/images/ic_check_filled.png`)}
        style={{ width: 18, height: 18 }}
      />
    ) : (
      <Image
        source={require(`assets/images/ic_check_empty.png`)}
        style={{ width: 18, height: 18 }}
      />
    )}
  </StyledTouchableOpacity>
);
