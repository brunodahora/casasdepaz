import React from "react";
import { StatusBar, BackHandler } from "react-native";
import styled from "styled-components/native";
import {
  FullScreenContainer,
  GradientButton,
  HeaderText,
  TextInput,
  Circle
} from "components";
import { colors } from "../../../constants";

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

const TabsView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 42px;
`;

export function Password({ navigation: { navigate } }) {
  const [password, setPassword] = React.useState("");
  const [confirmation, setConfirmation] = React.useState("");

  const goBack = () => navigate("Contacts");

  return (
    <StyledFullScreenContainer>
      <FillScreenContainer>
        <StyledHeaderText>Agora uma senha</StyledHeaderText>
        <TextInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          label="Repetir Senha"
          value={confirmation}
          onChangeText={setConfirmation}
          maxLength={20}
          secureTextEntry
        />
      </FillScreenContainer>
      <TabsView>
        <Circle color={colors.gray} />
        <Circle color={colors.gray} />
        <Circle color={colors.purple} />
      </TabsView>
      <GradientButton
        onPress={() => console.log("Cadastrar")}
        title="Cadastrar"
        colors={colors.gradient}
        textColor={colors.white}
      />
    </StyledFullScreenContainer>
  );
}
