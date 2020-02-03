import React from "react";
import { Image, StatusBar } from "react-native";
import styled from "styled-components/native";
import {
  GradientBackground,
  FullScreenContainer,
  SolidButton
} from "components";
import { colors } from "../../constants";

const StyledGradientBackground = styled(GradientBackground)`
  padding: ${StatusBar.currentHeight + 23}px 16px 32px 16px;
`;

export function Initial({ navigation: { navigate } }) {
  return (
    <StyledGradientBackground colors={colors.gradient}>
      <>
        <FullScreenContainer>
          <Image source={require("assets/images/logo_white.png")} />
        </FullScreenContainer>
        <SolidButton
          onPress={() => navigate("Login")}
          title="Login"
          color={colors.white}
          textColor={colors.purple}
        />
        <SolidButton
          transparent
          onPress={() => navigate("SignUp")}
          title="Criar uma conta"
          color={colors.white}
        />
      </>
    </StyledGradientBackground>
  );
}
