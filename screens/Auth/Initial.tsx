import React from "react";
import { Image, ImageBackground, StatusBar, View } from "react-native";
import styled from "styled-components/native";
import { FullScreenContainer, SolidButton } from "components";
import { colors } from "../../constants";

const StyledContainer = styled(View)`
  flex: 1;
  padding: ${StatusBar.currentHeight + 23}px 16px 32px 16px;
`;

export function Initial({ navigation: { navigate } }) {
  return (
    <ImageBackground
      source={require("../../assets/images/color_background.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <StyledContainer>
        <FullScreenContainer>
          <Image source={require("assets/images/logo_white.png")} />
        </FullScreenContainer>
        <SolidButton
          onPress={() => navigate("Login")}
          title="Login"
          color={colors.white}
          textColor={colors.green}
        />
        <SolidButton
          transparent
          onPress={() => navigate("SignUp")}
          title="Criar uma conta"
          color={colors.white}
        />
      </StyledContainer>
    </ImageBackground>
  );
}
