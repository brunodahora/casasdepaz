import React from "react";
import { Alert, Linking, Image, StatusBar, Platform } from "react-native";
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
  padding: ${StatusBar.currentHeight + 23}px 16px 32px 16px;
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
  const openVideo = () => {
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
            Linking.openURL(
              "https://www.youtube.com/watch?time_continue=20&v=GoK4lRjH2QI&feature=emb_logo"
            )
        }
      ],
      { cancelable: true }
    );
  };
  const downloadPdf = () => {
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
          onPress: () =>
            Linking.openURL(
              "https://www.pibcuritiba.org.br/wp-content/uploads/2019/04/Apostila_CasasDePaz_Ver_01_MIOLO_IMPRESS%C3%83O.pdf"
            )
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <StyledFullScreenContainer>
      <FillScreenContainer>
        {Platform.OS === "ios" && (
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
          <SolidButton
            transparent
            onPress={downloadPdf}
            title="Baixe o PDF"
            color={colors.green}
            icon={
              <Image
                source={require("../../assets/images/ic_download.png")}
                style={{ width: 20, height: 24 }}
              />
            }
          />
        </CenteredContainer>
      </FillScreenContainer>
    </StyledFullScreenContainer>
  );
}
