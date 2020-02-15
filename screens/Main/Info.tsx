import React from "react";
import { Alert, Linking, Image, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import styled from "styled-components/native";
import {
  FullScreenContainer,
  GradientButton,
  HeaderText,
  BackButton,
  SolidButton
} from "components";
import { colors, fontWeight } from "../../constants";

const StyledFullScreenContainer = styled(FullScreenContainer)`
  align-items: flex-start;
  padding: ${getStatusBarHeight() + 23}px 16px 32px 16px;
  width: 100%;
`;

const StyledHeaderText = styled(HeaderText)`
  margin: 0 0 60px 5px;
`;

const StyledText = styled.Text`
  font-size: 18px;
  line-height: 21px;
  font-weight: ${fontWeight.light};
  color: ${colors.darkGreen};
`;

const FillScreenContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const CenteredContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export function Info({ navigation: { navigate } }) {
  const openLink = () => {
    if (Platform.OS === "web") {
      Linking.openURL("https://pibcuritiba.org.br/casasdepaz");
    } else {
      Alert.alert(
        "Você será redirecionado",
        "Você será redirecionado para fora do aplicativo para ver o site.",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Continuar",
            onPress: () =>
              Linking.openURL("https://pibcuritiba.org.br/casasdepaz")
          }
        ],
        { cancelable: true }
      );
    }
  };
  const openVideo = () => {
    if (Platform.OS === "web") {
      Linking.openURL("https://www.youtube.com/watch?v=Xf7UYY9Nopw");
    } else {
      Alert.alert(
        "Você será redirecionado",
        "Você será redirecionado para fora do aplicativo para ver o vídeo.",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Continuar",
            onPress: () =>
              Linking.openURL("https://www.youtube.com/watch?v=Xf7UYY9Nopw")
          }
        ],
        { cancelable: true }
      );
    }
  };
  const downloadPdf = () => {
    if (Platform.OS === "web") {
      Linking.openURL("http://bit.ly/casadepazpdf");
    } else {
      Alert.alert(
        "Baixar o PDF",
        "O aplicativo Casas de Paz deseja baixar um arquivo no seu celular",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Continuar",
            onPress: () => Linking.openURL("http://bit.ly/casadepazpdf")
          }
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <StyledFullScreenContainer>
      <FillScreenContainer>
        {Platform.OS !== "android" && (
          <BackButton onPress={() => navigate("Main")} />
        )}
        <StyledHeaderText>Saiba Mais</StyledHeaderText>
        <StyledText>
          {
            "Esse é um conteúdo adicional da casas de paz que explica como o programa funciona. "
          }
        </StyledText>
        <CenteredContainer>
          <GradientButton
            onPress={openLink}
            title="Visite o site"
            colors={colors.gradient}
            textColor={colors.white}
            icon={
              <Image
                source={require("../../assets/images/ic_home.png")}
                style={{ width: 24, height: 24 }}
              />
            }
          />
          <GradientButton
            onPress={openVideo}
            title="Veja o Vídeo"
            colors={colors.gradient}
            textColor={colors.white}
            icon={
              <Image
                source={require("../../assets/images/ic_video.png")}
                style={{ width: 24, height: 24 }}
              />
            }
          />
          <GradientButton
            onPress={downloadPdf}
            title="Baixe o PDF"
            colors={colors.gradient}
            textColor={colors.white}
            icon={
              <Image
                tintColor={colors.white}
                source={require("../../assets/images/ic_download.png")}
                style={{ width: 20, height: 24 }}
              />
            }
          />
          <SolidButton
            transparent
            onPress={() => Linking.openURL("tel:4130914358")}
            title="Fale conosco (1)"
            color={colors.green}
            icon={
              <Image
                tintColor={colors.green}
                source={require("../../assets/images/ic_call.png")}
                style={{ width: 20, height: 24 }}
              />
            }
          />
          <SolidButton
            transparent
            onPress={() => Linking.openURL("tel:4130914439")}
            title="Fale conosco (2)"
            color={colors.green}
            icon={
              <Image
                tintColor={colors.green}
                source={require("../../assets/images/ic_call.png")}
                style={{ width: 20, height: 24 }}
              />
            }
          />
        </CenteredContainer>
      </FillScreenContainer>
    </StyledFullScreenContainer>
  );
}
