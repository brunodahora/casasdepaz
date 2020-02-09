import React from "react";
import { Image, TouchableOpacity, StatusBar } from "react-native";
import firebase from "firebase";
import * as Sentry from "sentry-expo";
import styled from "styled-components/native";
import { FullScreenContainer, GradientButton } from "components";
import { UserContext } from "helpers";
import { colors, fontWeight } from "../../constants";
import { NavigationProps } from "../../models";

const StyledFullScreenContainer = styled(FullScreenContainer)`
  align-items: flex-start;
  padding: ${StatusBar.currentHeight + 23}px 16px 32px 16px;
  width: 100%;
`;

const StyledHeader = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 56px;
  width: 100%;
`;

const StyledNameText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  line-height: 24px;
  color: ${colors.green};
`;

const FillScreenContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const StyledSubHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledTitle = styled.Text`
  font-size: 26px;
  font-weight: bold;
  line-height: 31px;
  color: ${colors.red};
`;

const StyledEmptyText = styled.Text`
  font-size: 14px;
  font-weight: ${fontWeight.light};
  line-height: 16px;
  color: ${colors.transparentGreen};
`;

export function Main({
  navigation: { navigate }
}: NavigationProps): JSX.Element {
  const {
    user: { name, surname }
  } = React.useContext(UserContext);
  return (
    <StyledFullScreenContainer>
      <StyledHeader>
        <StyledNameText>{`${name} ${surname}`}</StyledNameText>
        <TouchableOpacity onPress={() => navigate("Profile")}>
          <Image
            source={require("assets/images/ic_gear.png")}
            style={{ width: 24, height: 24, tintColor: colors.green }}
          />
        </TouchableOpacity>
      </StyledHeader>
      <StyledSubHeader>
        <Image
          source={require("assets/images/ic_casasdepaz.png")}
          style={{
            width: 24,
            height: 24,
            marginRight: 18,
            tintColor: colors.red
          }}
        />
        <StyledTitle>Casas de paz</StyledTitle>
      </StyledSubHeader>
      <FillScreenContainer>
        <StyledEmptyText>Nenhuma casa cadastrada no momento</StyledEmptyText>
      </FillScreenContainer>
      <GradientButton
        onPress={() => console.log("Criar")}
        title="+ Cadastrar casa de paz"
        colors={colors.gradient}
        textColor={colors.white}
      />
    </StyledFullScreenContainer>
  );
}
