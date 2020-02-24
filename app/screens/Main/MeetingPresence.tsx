import React from "react";
import { Platform, ScrollView } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import firebase from "firebase";
import isEmpty from "lodash/isEmpty";
import * as Sentry from "../../sentry";
import styled from "styled-components/native";
import {
  FullScreenContainer,
  BackButton,
  GradientButton,
  ParticipantsList,
  PresenceAction
} from "components";
import { colors, fontWeight } from "../../constants";

const StyledFullScreenContainer = styled(FullScreenContainer)`
  align-items: flex-start;
  justify-content: flex-start;
  padding: ${getStatusBarHeight()}px 0px 16px 0px;
  width: 100%;
`;

const StyledHeader = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 23px 16px 16px 16px;
`;

const StyledNameText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  line-height: 24px;
  color: ${colors.green};
`;

const StyledSubHeader = styled.Text`
  color: ${colors.green};
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: -0.36px;
  line-height: 18px;
  padding: 38px 16px 16px 16px;
  border-bottom-width: ${props => (props.isEmpty ? "0" : "1px")};
  border-color: ${colors.green};
`;

const StyledEventNumber = styled.Text`
  color: ${colors.darkGreen};
  font-size: 15px;
  font-weight: ${fontWeight.light};
  line-height: 18px;
  padding: 0px 16px;
`;

const StyledGradientButtonContainer = styled.View`
  padding: 16px;
  width: 100%;
`;

const FillScreenContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const ScrollViewContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

export const MeetingPresence = ({
  navigation: { navigate, getParam, addListener }
}) => {
  const meetingId = getParam("meetingId", null);
  const placeId = getParam("placeId", null);
  const placeName = getParam("placeName", "");
  const meetings = getParam("meetings", {});

  const db = firebase.firestore();

  const [meetingPresence, setMeetingPresence] = React.useState(
    meetings[meetingId] || {}
  );
  const [participants, setParticipants] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchParticipants = () => {
    setLoading(true);
    db.collection(`places/${placeId}/participants`)
      .get()
      .then(querySnapshot => {
        const participants = [];
        querySnapshot.forEach(doc =>
          participants.push({ id: doc.id, ...doc.data() })
        );
        setParticipants(participants);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        Sentry.captureException(error);
      });
  };
  addListener("willFocus", fetchParticipants);

  const handleBackPress = () => navigate("MeetingView");

  const createParticipant = () =>
    navigate("ParticipantRegistration", { placeId });

  const toggleParticipantPresence = participantId => () => {
    const updatedMeetingPresence = {
      ...meetingPresence,
      [participantId]: !meetingPresence[participantId]
    };
    db.collection("places")
      .doc(placeId)
      .update({
        meetings: {
          ...meetings,
          [meetingId]: updatedMeetingPresence
        }
      })
      .then(() => {
        setMeetingPresence(updatedMeetingPresence);
      })
      .catch(error => {
        console.error("Error updating presence: ", error);
        Sentry.captureException(error);
      });
  };

  return (
    <StyledFullScreenContainer>
      <ScrollViewContainer>
        {Platform.OS !== "android" && <BackButton onPress={handleBackPress} />}
        <StyledHeader>
          <StyledNameText>{`${placeName}`}</StyledNameText>
        </StyledHeader>
        <StyledEventNumber>{`Evento ${meetingId + 1}/5`}</StyledEventNumber>
        <StyledSubHeader isEmpty={isEmpty(participants)}>
          Participantes
        </StyledSubHeader>
        <ParticipantsList
          participants={participants}
          loading={loading}
          presence={meetingPresence || {}}
          renderAction={PresenceAction}
          onPress={toggleParticipantPresence}
        />
      </ScrollViewContainer>
      <StyledGradientButtonContainer>
        <GradientButton
          onPress={createParticipant}
          title="+ Cadastrar Participante"
          colors={colors.gradient}
          textColor={colors.white}
        />
      </StyledGradientButtonContainer>
    </StyledFullScreenContainer>
  );
};
