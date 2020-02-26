import React from "react";
import { Image, TouchableOpacity, Linking, Platform } from "react-native";
import styled from "styled-components/native";

const StyledContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #ddd;
  align-items: center;
  padding: 8px;
`;

const StyledContent = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const StyledHeader = styled.Text`
  font-size: 18px;
`;

const StyledSubHeader = styled.Text`
  font-size: 14px;
`;

const StyledCFA = styled.Text`
  font-size: 24px;
  color: #6ba0e6;
  margin: 16px;
`;

export const SmartAppBanner = () => {
  const [showBanner, toggleShowBanner] = React.useState(true);

  if (Platform.OS !== "web" || !showBanner) return null;

  console.log(window.navigator.userAgent);

  let os = null;
  if (/Android/.test(window.navigator.userAgent)) {
    os = "android";
  } else if (/iPad|iPhone|iPod/.test(window.navigator.userAgent)) {
    os = "ios";
  }

  const platform = {
    android: {
      storeName: "Play Store",
      link:
        "https://play.google.com/store/apps/details?id=br.com.pibcuritiba.casasdepaz"
    },
    ios: {
      storeName: "App Store",
      link: "https://apps.apple.com/us/app/casas-de-paz/id1498507346?ls=1"
    }
  };

  return (
    <StyledContainer>
      <TouchableOpacity onPress={() => toggleShowBanner(false)}>
        <Image
          source={require("assets/images/ic_close.png")}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>
      <Image
        source={require("assets/images/icon.png")}
        style={{
          marginLeft: 16,
          marginRight: 16,
          width: 48,
          height: 48,
          borderRadius: 3
        }}
      />
      <StyledContent>
        <StyledHeader>Casas de Paz</StyledHeader>
        <StyledSubHeader>PIB Curitiba</StyledSubHeader>
        <StyledSubHeader>{`GET - On the ${platform[os].storeName}`}</StyledSubHeader>
      </StyledContent>
      <TouchableOpacity onPress={() => Linking.openURL(platform[os].link)}>
        <StyledCFA>Ver</StyledCFA>
      </TouchableOpacity>
    </StyledContainer>
  );
};
