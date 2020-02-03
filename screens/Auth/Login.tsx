import React from "react";
import { StatusBar } from "react-native";
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
        onPress={() => console.log("Login")}
        title="Entrar"
        colors={colors.gradient}
        textColor={colors.white}
      />
      <SolidButton
        transparent
        onPress={() => navigate("SignUp")}
        title="Criar uma conta"
        color={colors.purple}
      />
    </StyledFullScreenContainer>
  );
}
