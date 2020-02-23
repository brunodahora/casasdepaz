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
  ParticipantsList,
  WarningModal
} from "components";
import { UserContext } from "helpers";
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
  const {
    user: { uid }
  } = React.useContext(UserContext);

  const db = firebase.firestore();

  const [place, setPlace] = React.useState(null);
  const [participants, setParticipants] = React.useState([]);
  const [showDeleteModal, toggleDeleteModal] = React.useState(false);

  React.useEffect(() => {
    db.collection("places")
      .doc(placeId)
      .get()
      .then(doc => {
        if (doc.exists) {
          setPlace(doc.data());
          db.collection(`places/${placeId}/participants`)
            .get()
            .then(querySnapshot => {
              const participants = [];
              querySnapshot.forEach(doc =>
                participants.push({ id: doc.id, ...doc.data() })
              );
              setParticipants(participants);
            })
            .catch(error => {
              console.log(error);
              Sentry.captureException(error);
            });
        } else {
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
    meetings = []
  } = place;

  const handleBackPress = () => navigate("Main");
  const openDeleteModal = () => toggleDeleteModal(true);
  const closeDeleteModal = () => toggleDeleteModal(false);
  const deletePlace = () => {
    db.collection(`users/${uid}/places`)
      .doc(id)
      .delete()
      .then(() => {
        db.collection("places")
          .doc(placeId)
          .delete()
          .then(() => {
            navigate("Main");
          })
          .catch(error => {
            console.error("Error removing place: ", error);
            Sentry.captureException(error);
          });
      })
      .catch(error => {
        console.error("Error removing place from user: ", error);
        Sentry.captureException(error);
      });
  };
  const createParticipant = () =>
    navigate("ParticipantRegistration", { placeId });

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
        <StyledInfo>{`${address || ""}\n${neighborhood || ""}${
          cep ? " - CEP " : ""
        }${cep || ""}\n${city || ""}${state ? " - " : ""}${state ||
          ""}\n${time || ""}`}</StyledInfo>
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
        <StyledDeleteButton onPress={openDeleteModal}>
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
        {showDeleteModal && (
          <WarningModal
            message={
              "Deseja Excluir casa de paz?\nEssa ação não pode ser desfeita"
            }
            confirmAction={deletePlace}
            confirmText="Remover"
            cancelAction={closeDeleteModal}
            cancelText="Cancelar"
          />
        )}
      </StyledFullScreenContainer>
    </ScrollView>
  );
};
