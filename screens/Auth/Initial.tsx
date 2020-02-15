import React from "react";
import { Image, ImageBackground, View, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import styled from "styled-components/native";
import isEmpty from "lodash/isEmpty";
import { FullScreenContainer, SolidButton, SmartAppBanner } from "components";
import { UserContext } from "helpers";
import { colors } from "../../constants";

const StyledContainer = styled(View)`
  flex: 1;
  align-items: center;
  padding: ${getStatusBarHeight() + 23}px 16px 32px 16px;
`;

const StyledAppBannerContainer = styled.View`
  margin-top: ${getStatusBarHeight()}px;
`;

export function Initial({ navigation: { navigate }, route }) {
  const { user, setUser } = React.useContext(UserContext);

  if (!isEmpty(user)) {
    if (user.clearUser) {
      setUser({});
    } else {
      navigate("Main");
    }
    return null;
  }

  return (
    <ImageBackground
      source={
        Platform.OS === "web"
          ? require("../../assets/images/color_background_web.png")
          : require("../../assets/images/color_background.png")
      }
      style={{ width: "100%", height: "100%" }}
    >
      <StyledAppBannerContainer>
        <SmartAppBanner />
      </StyledAppBannerContainer>
      <StyledContainer>
        <FullScreenContainer>
          <Image
            source={require("assets/images/logo_white.png")}
            style={{ width: 236, height: 200 }}
          />
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
