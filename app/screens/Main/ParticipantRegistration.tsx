import React from "react";
import { Platform, KeyboardAvoidingView } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import styled from "styled-components/native";
import firebase from "firebase";
import * as Sentry from "../../sentry";
import isEmpty from "lodash/isEmpty";
import {
  FullScreenContainer,
  GradientButton,
  HeaderText,
  TextInput,
  Picker,
  BackButton
} from "components";
import { colors } from "../../constants";

const StyledFullScreenContainer = styled(FullScreenContainer)`
  align-items: flex-start;
  padding: ${getStatusBarHeight() + 23}px 16px 32px 16px;
  width: 100%;
`;

const StyledHeaderText = styled(HeaderText)`
  margin: 0 0 60px 5px;
`;

const FillScreenContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const StyledActivityIndicator = styled.ActivityIndicator`
  align-self: center;
  justify-content: center;
  width: 100%;
`;

type Errors = {
  name?: string;
  age?: string;
  gender?: string;
};

export function ParticipantRegistration({ navigation: { goBack, getParam } }) {
  const placeId = getParam("placeId", null);

  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Errors>({});

  const db = firebase.firestore();

  const createParticipant = () => {
    setLoading(true);
    db.collection("participants")
      .add({
        name,
        age,
        gender,
        placeId
      })
      .then(participant => {
        db.collection(`places/${placeId}/participants`)
          .add({
            participantId: participant.id,
            name
          })
          .then(() => {
            setLoading(false);
            goBack();
          })
          .catch(error => {
            setLoading(false);
            console.log("Error adding participant to place: ", error);
            Sentry.captureException(error);
          });
      })
      .catch(error => {
        setLoading(false);
        console.log("Error adding participant: ", error);
        Sentry.captureException(error);
      });
  };

  const onSubmit = () => {
    let errors: Errors = {};

    if (name === "") errors.name = "Nome é obrigatório";
    if (age === "") errors.age = "Idade é obrigatória";
    if (gender === "") errors.gender = "Sexo é obrigatório";

    if (isEmpty(errors)) {
      createParticipant();
    } else {
      setErrors(errors);
    }
  };

  const handleBackPress = () => {
    goBack();
    return true;
  };

  return (
    <StyledFullScreenContainer>
      <KeyboardAvoidingView behavior="padding" enabled>
        <FillScreenContainer>
          {Platform.OS !== "android" && (
            <BackButton onPress={handleBackPress} />
          )}
          <StyledHeaderText>Dados do participante</StyledHeaderText>
          <TextInput
            label="Nome"
            value={name}
            onChangeText={setName}
            error={errors.name}
          />
          <TextInput
            label="Idade"
            value={age}
            onChangeText={setAge}
            error={errors.age}
            keyboardType="number-pad"
          />
          <Picker
            label="Sexo"
            error={errors.gender}
            placeholder={{ label: "Selecione...", value: "" }}
            options={[
              { label: "Masculino", value: "Masculino" },
              { label: "Feminino", value: "Feminino" }
            ]}
            selectedValue={gender}
            onValueChange={setGender}
          />
        </FillScreenContainer>
        {loading ? (
          <StyledActivityIndicator size="large" color={colors.green} />
        ) : (
          <GradientButton
            onPress={onSubmit}
            title="Cadastrar"
            colors={colors.gradient}
            textColor={colors.white}
          />
        )}
      </KeyboardAvoidingView>
    </StyledFullScreenContainer>
  );
}
