import React from "react";
import { Platform, ScrollView, KeyboardAvoidingView } from "react-native";
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
  BackButton,
  CenteredLoading
} from "components";
import { addPhoneMask, addCpfMask } from "helpers";
import { colors, emailRegex } from "../../constants";

const StyledFullScreenContainer = styled(FullScreenContainer)`
  align-items: flex-start;
  padding: ${getStatusBarHeight() + 23}px 16px 32px 16px;
  width: 100%;
`;

const StyledHeaderText = styled(HeaderText)`
  margin: 0 0 60px 5px;discipleship
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
  email?: string;
  phone?: string;
  cpf?: string;
};

export function DiscipleshipRegistration({ navigation: { goBack, getParam } }) {
  const placeId = getParam("placeId", null);
  const participantId = getParam("participantId", false);

  const [participant, setParticipant] = React.useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    cpf: "",
    leader: ""
  });
  const [loading, setLoading] = React.useState(true);
  const [errors, setErrors] = React.useState<Errors>({});

  const updateData = payload => setParticipant({ ...participant, ...payload });

  const setName = (name: string) => {
    updateData({ name });
    setErrors({ ...errors, name: undefined });
  };
  const setAge = (age: string) => {
    updateData({ age });
    setErrors({ ...errors, age: undefined });
  };
  const setGender = (gender: string) => {
    updateData({ gender });
    setErrors({ ...errors, gender: undefined });
  };
  const setEmail = (email: string) => {
    updateData({ email });
    setErrors({ ...errors, email: undefined });
  };
  const setPhoneWithMask = (phone: string) => {
    updateData({ phone: addPhoneMask(phone) });
    setErrors({ ...errors, phone: undefined });
  };
  const setCpfWithMask = (cpf: string) => {
    updateData({ cpf: addCpfMask(cpf) });
    setErrors({ ...errors, cpf: undefined });
  };
  const setLeader = (leader: string) => updateData({ leader });

  const db = firebase.firestore();

  React.useEffect(() => {
    db.collection("participants")
      .doc(participantId)
      .get()
      .then(doc => {
        if (doc.exists) {
          setParticipant(doc.data());
          setLoading(false);
        } else {
          console.log("No such document!");
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
        Sentry.captureException(error);
        setLoading(false);
      });
  }, []);

  if (!participant)
    return <CenteredLoading size="large" color={colors.green} />;

  const updateParticipant = () => {
    setLoading(true);
    db.collection("participants")
      .doc(participantId)
      .set({
        ...participant,
        placeId
      })
      .then(() => {
        setLoading(false);
        goBack();
      })
      .catch(error => {
        setLoading(false);
        console.log("Error updating participant: ", error);
        Sentry.captureException(error);
      });
  };

  const { name, age, gender, email, phone, cpf, leader } = participant;

  const onSubmit = () => {
    let errors: Errors = {};

    if (isEmpty(name)) errors.name = "Nome é obrigatório";
    if (isEmpty(age)) errors.age = "Idade é obrigatória";
    if (isEmpty(gender)) errors.gender = "Sexo é obrigatório";

    if (isEmpty(email)) errors.email = "Email é obrigatório";
    if (isEmpty(phone)) errors.phone = "Telefone é obrigatório";
    if (phone && phone.length < 14) errors.phone = "Número incompleto";
    if (!emailRegex.test(String(email).toLowerCase())) {
      errors.email = "E-mail inválido";
    }
    if (isEmpty(cpf)) errors.cpf = "CPF é obrigatório";
    if (cpf && cpf.length < 14) errors.cpf = "CPF incompleto";

    if (isEmpty(errors)) {
      updateParticipant();
    } else {
      setErrors(errors);
    }
  };

  const handleBackPress = () => {
    goBack();
    return true;
  };

  return (
    <ScrollView>
      <StyledFullScreenContainer>
        <KeyboardAvoidingView behavior="padding" enabled>
          <FillScreenContainer>
            {Platform.OS !== "android" && (
              <BackButton onPress={handleBackPress} />
            )}
            <StyledHeaderText>Dados do discipulado</StyledHeaderText>
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
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
            />
            <TextInput
              label="Telefone"
              value={phone}
              onChangeText={setPhoneWithMask}
              maxLength={15}
              keyboardType="phone-pad"
              error={errors.phone}
            />
            <TextInput
              label="CPF"
              value={cpf}
              onChangeText={setCpfWithMask}
              maxLength={14}
              error={errors.cpf}
            />
            <TextInput
              label="Líder do grupo de discipulado"
              value={leader}
              onChangeText={setLeader}
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
    </ScrollView>
  );
}
