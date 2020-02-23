import React from "react";
import styled from "styled-components/native";
import { CenteredLoading } from "components";
import { colors, fontWeight } from "../constants";

import { Participant } from "./Participant";

const StyledEmptyText = styled.Text`
  font-size: 14px;
  font-weight: ${fontWeight.light};
  line-height: 16px;
  padding: 16px;
  color: ${colors.transparentGreen};
`;

export const ParticipantsList = ({
  participants = [],
  loading,
  renderAction,
  ...otherProps
}) => {
  if (loading) return <CenteredLoading />;

  if (participants.length === 0)
    return (
      <StyledEmptyText>
        Nenhum participante cadastrada no momento
      </StyledEmptyText>
    );

  return participants.map(participant => (
    <Participant
      key={participant.id}
      {...participant}
      renderAction={renderAction}
      {...otherProps}
    />
  ));
};
