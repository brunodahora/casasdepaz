import React from "react";
import { Image, TouchableOpacity, Platform, ScrollView } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import firebase from "firebase";
import isEmpty from "lodash/isEmpty";
import * as Sentry from "../../sentry";
import styled from "styled-components/native";
import {
  FullScreenContainer,
  BackButton,
  GradientButton,
  MeetingItem,
  ParticipantsList
} from "components";
import { colors, fontWeight } from "../../constants";

const StyledActivityIndicator = styled.ActivityIndicator`
  flex: 1;
  align-self: center;
  justify-content: center;
`;

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

const StyledInfo = styled.Text`
  color: ${colors.darkGreen};
  font-size: 15px;
  font-weight: ${fontWeight.light};
  line-height: 18px;
  padding: 0px 16px;
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

const StyledDeleteButton = styled.TouchableOpacity`
  margin: 36px 0px 56px 16px;
`;

const StyledDeleteText = styled.Text`
  color: ${colors.red};
  font-size: 16px;
  font-weight: ${fontWeight.medium}
  line-height: 19px;
`;

const StyledHR = styled.View`
  height: 2px;
  width: 135px;
  background-color: ${colors.red};
`;

const StyledGradientButtonContainer = styled.View`
  padding: 16px;
  width: 100%;
`;

export const MeetingView = ({ navigation: { navigate, getParam } }) => {
  const id = getParam("id", null);
  const placeId = getParam("placeId", null);

  const [place, setPlace] = React.useState(null);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("places")
      .doc(placeId)
      .get()
      .then(doc => {
        if (doc.exists) {
          setPlace(doc.data());
          StyledSubHeader;
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log(error);
        Sentry.captureException(error);
      });
  }, [placeId]);

  if (!place)
    return <StyledActivityIndicator size="large" color={colors.green} />;

  const {
    address,
    cep,
    neighborhood,
    state,
    city,
    time,
    name,
    meetings = [],
    participants = []
  } = place;

  const handleBackPress = () => navigate("Main");
  const promptDelete = () => {
    console.log("Delete");
  };
  const createParticipant = () => console.log("Create Participant");

  return (
    <ScrollView>
      <StyledFullScreenContainer>
        {Platform.OS !== "android" && <BackButton onPress={handleBackPress} />}
        <StyledHeader>
          <StyledNameText>{`${name}`}</StyledNameText>
          <TouchableOpacity
            onPress={() => navigate("MeetingRegistration", { id, placeId })}
          >
            <Image
              source={require("assets/images/ic_gear.png")}
              style={{ width: 24, height: 24, tintColor: colors.green }}
            />
          </TouchableOpacity>
        </StyledHeader>
        <StyledInfo>{`${address}\n${neighborhood} - CEP ${cep}\n${city} - ${state}\n${time}`}</StyledInfo>
        <StyledSubHeader>Encontros</StyledSubHeader>
        {[0, 1, 2, 3, 4].map(id => (
          <MeetingItem
            key={`metting-${id}`}
            id={id}
            completed={!isEmpty(meetings) && meetings[id]}
          />
        ))}
        <StyledSubHeader isEmpty={isEmpty(participants)}>
          Participantes
        </StyledSubHeader>
        <ParticipantsList participants={participants} />
        <StyledDeleteButton onPress={promptDelete}>
          <StyledDeleteText>Excluir casa de paz</StyledDeleteText>
          <StyledHR />
        </StyledDeleteButton>
        <StyledGradientButtonContainer>
          <GradientButton
            onPress={createParticipant}
            title="+ Cadastrar Participante"
            colors={colors.gradient}
            textColor={colors.white}
          />
        </StyledGradientButtonContainer>
      </StyledFullScreenContainer>
    </ScrollView>
  );
};
