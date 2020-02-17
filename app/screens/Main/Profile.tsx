import React from "react";
import { Platform, KeyboardAvoidingView } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import styled from "styled-components/native";
import isEmpty from "lodash/isEmpty";
import firebase from "firebase";
import "firebase/firestore";
import * as Sentry from "../../sentry";
import {
  FullScreenContainer,
  GradientButton,
  HeaderText,
  TextInput,
  BackButton,
  Picker
} from "components";
import { colors, emailRegex, fontWeight } from "../../constants";
import { NavigationProps, SignUpData } from "../../models";
import { UserContext, addCpfMask, addPhoneMask } from "helpers";

const StyledFullScreenContainer = styled(FullScreenContainer)`
  align-items: flex-start;
  padding: ${getStatusBarHeight() + 23}px 16px 0px 16px;
  width: 100%;
`;

const StyledHeaderText = styled(HeaderText)`
  margin: 0 0 60px 5px;
`;

const ScrollViewContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const StyledActivityIndicator = styled.ActivityIndicator`
  align-self: center;
  justify-content: center;
  width: 100%;
`;

const StyledLogout = styled.Text`
  color: ${colors.red};
  font-size: 20px;
  font-weight: ${fontWeight.medium}
  line-height: 24px;
`;

const StyledHR = styled.View`
  height: 2px;
  width: 36px;
  background-color: ${colors.red};
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  margin-top: 42px;
  margin-bottom: 92px;
`;

const PaddingBottom = styled.View`
  padding-bottom: 32px;
`;

type Errors = {
  name?: string;
  surname?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  hasCellGroup?: string;
  gender?: string;
  age?: string;
};

type UserContextType = {
  user: SignUpData;
  setUser: (SignUpData) => void;
};

export function Profile({
  navigation: { navigate }
}: NavigationProps): JSX.Element {
  const userContext: UserContextType = React.useContext(UserContext);
  const [user, setUser] = React.useState({
    ...userContext.user,
    cpf: addCpfMask(userContext.user.cpf),
    phone: addPhoneMask(userContext.user.phone)
  });
  const [loading, setLoading] = React.useState(false);

  const [errors, setErrors] = React.useState<Errors>({});

  const {
    uid,
    name,
    surname,
    cpf,
    email,
    phone,
    hasCellGroup,
    gender,
    age
  } = user;
  const updateUser = (prop: string) => (value: string | boolean) => {
    setUser({ ...user, [prop]: value });
    setErrors({ ...errors, [prop]: undefined });
  };

  const setCpfWithMask = (cpf: string) => {
    updateUser(cpf)(addCpfMask(cpf));
    setErrors({ ...errors, cpf: undefined });
  };

  const setPhoneWithMask = (phone: string) => {
    updateUser(phone)(addPhoneMask(phone));
    setErrors({ ...errors, phone: undefined });
  };

  const saveUserOnFirebase = () => {
    const newUser = {
      uid,
      name,
      surname,
      cpf: cpf.replace(/\D/g, ""),
      email,
      phone: phone.replace(/\D/g, ""),
      hasCellGroup,
      gender,
      age
    };
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update(newUser);
    userContext.setUser(newUser);
    setLoading(false);
    navigate("Main");
  };

  const onSubmit = () => {
    let errors: Errors = {};

    if (name === "") errors.name = "Nome é obrigatório";
    if (surname === "") errors.surname = "Sobrenome é obrigatório";
    if (cpf === "") errors.cpf = "CPF é obrigatório";
    if (cpf && cpf.length < 14) errors.cpf = "CPF incompleto";
    if (email === "") errors.email = "Email é obrigatório";
    if (phone === "") errors.phone = "Telefone é obrigatório";
    if (phone.length < 14) errors.phone = "Número incompleto";
    if (!emailRegex.test(String(email).toLowerCase())) {
      errors.email = "E-mail inválido";
    }
    if (hasCellGroup === null) errors.hasCellGroup = "Selecione uma opção";
    if (gender === "") errors.gender = "Selecione uma opção";
    if (age === "") errors.age = "Idade é obrigatório";

    if (isEmpty(errors)) {
      saveUserOnFirebase();
    } else {
      setErrors(errors);
    }
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        userContext.setUser({ ...user, clearUser: true });
        navigate("Initial");
      })
      .catch(error => Sentry.captureException(error));
  };

  return (
    <StyledFullScreenContainer>
      <ScrollViewContainer>
        <KeyboardAvoidingView behavior="padding" enabled>
          {Platform.OS !== "android" && (
            <BackButton onPress={() => navigate("MoreInfo")} />
          )}
          <StyledHeaderText>Perfil</StyledHeaderText>
          <TextInput
            label="Nome"
            value={name}
            onChangeText={updateUser("name")}
            error={errors.name}
          />
          <TextInput
            label="Sobrenome"
            value={surname}
            onChangeText={updateUser("surname")}
            error={errors.surname}
          />
          <TextInput
            label="CPF"
            value={cpf}
            onChangeText={setCpfWithMask}
            maxLength={14}
            error={errors.cpf}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={updateUser("email")}
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
          <Picker
            label="Participa de uma célula da PIB Curitiba?"
            error={errors.hasCellGroup}
            placeholder={{ label: "Selecione...", value: null }}
            options={[
              { label: "Sim", value: true },
              { label: "Não", value: false }
            ]}
            selectedValue={hasCellGroup}
            onValueChange={updateUser("hasCellGroup")}
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
            onValueChange={updateUser("gender")}
          />
          <TextInput
            label="Idade"
            value={age}
            onChangeText={updateUser("age")}
            keyboardType="number-pad"
            error={errors.age}
          />
          <StyledTouchableOpacity onPress={logout}>
            <StyledLogout>Sair</StyledLogout>
            <StyledHR />
          </StyledTouchableOpacity>
          {loading ? (
            <StyledActivityIndicator size="large" color={colors.green} />
          ) : (
            <GradientButton
              onPress={onSubmit}
              title="Concluir"
              colors={colors.gradient}
              textColor={colors.white}
            />
          )}
          <PaddingBottom />
        </KeyboardAvoidingView>
      </ScrollViewContainer>
    </StyledFullScreenContainer>
  );
}
