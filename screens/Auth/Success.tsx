import React from "react";
import { Image, StatusBar } from "react-native";
import styled from "styled-components/native";
import { FullScreenContainer, GradientButton, HeaderText } from "components";
import { colors, fontWeight } from "../../constants";

const StyledFullScreenContainer = styled(FullScreenContainer)`
  align-items: flex-start;
  padding: ${StatusBar.currentHeight + 23}px 16px 32px 16px;
  width: 100%;
`;

const StyledHeaderText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  line-height: 26px;
  color: ${colors.green};
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

export function Success({ navigation: { navigate } }) {
  return (
    <StyledFullScreenContainer>
      <FillScreenContainer>
        <StyledHeaderText>Perfil criado com sucesso</StyledHeaderText>
        <StyledText>
          {
            "Bem-vindo ao aplicativo da campanha Casas de Paz.\nNele você pode cadastrar os locais e acompanhar os seus encontros.\nSe quiser saber mais, clique no botão na próxima tela."
          }
        </StyledText>
        <CenteredContainer>
          <Image
            source={require("assets/images/ic_success.png")}
            style={{ width: 200, height: 200 }}
          />
        </CenteredContainer>
      </FillScreenContainer>
      <GradientButton
        onPress={() => navigate("Main")}
        title="Concluir"
        colors={colors.gradient}
        textColor={colors.white}
      />
    </StyledFullScreenContainer>
  );
}
