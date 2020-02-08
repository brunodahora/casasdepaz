import React from "react";
import { Alert, StatusBar } from "react-native";
import firebase from "firebase";
import * as Sentry from "sentry-expo";
import styled from "styled-components/native";
import {
  FullScreenContainer,
  SolidButton,
  GradientButton,
  HeaderText,
  TextInput
} from "components";
import { colors } from "../../constants";
const StyledFullScreenContainer = styled(FullScreenContainer)`
  align-items: flex-start;
  padding: ${StatusBar.currentHeight + 23}px 16px 32px 16px;
  width: 100%;
`;

const StyledHeaderText = styled(HeaderText)`
  margin: 0 0 60px 5px;
`;

const FillScreenContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const attemptLogin = ({ email, password, navigate }) => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() =>
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => navigate("Main"))
        .catch(error => {
          Alert.alert(
            "Erro ao efetuar o login.\nVerifique seu e-mail e/ou sua senha."
          );
          console.log(error);
          Sentry.captureException(error);
        })
    );
};

export function Login({ navigation: { navigate } }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <StyledFullScreenContainer>
      <FillScreenContainer>
        <StyledHeaderText>Log In</StyledHeaderText>
        <TextInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </FillScreenContainer>
      <GradientButton
        onPress={() => attemptLogin({ email, password, navigate })}
        title="Entrar"
        colors={colors.gradient}
        textColor={colors.white}
      />
      <SolidButton
        transparent
        onPress={() => navigate("SignUp")}
        title="Criar uma conta"
        color={colors.green}
      />
    </StyledFullScreenContainer>
  );
}
