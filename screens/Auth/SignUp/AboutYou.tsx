import React from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import {
  FullScreenContainer,
  GradientButton,
  HeaderText,
  TextInput,
  Circle
} from "components";
import { colors } from "../../../constants";
import { addCpfMask } from "helpers";

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

export function AboutYou({ navigation: { navigate } }) {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [cpf, setCpf] = React.useState("");

  const setCpfWithMask = cpf => setCpf(addCpfMask(cpf));

  return (
    <StyledFullScreenContainer>
      <FillScreenContainer>
        <StyledHeaderText>Sobre Você</StyledHeaderText>
        <TextInput label="Nome" value={name} onChangeText={setName} />
        <TextInput
          label="Sobrenome"
          value={surname}
          onChangeText={setSurname}
        />
        <TextInput
          label="CPF"
          value={cpf}
          onChangeText={setCpfWithMask}
          maxLength={14}
        />
      </FillScreenContainer>
      <TabsView>
        <Circle color={colors.green} />
        <Circle color={colors.gray} />
        <Circle color={colors.gray} />
      </TabsView>
      <GradientButton
        onPress={() => navigate("Contacts")}
        title="Continuar"
        colors={colors.gradient}
        textColor={colors.white}
      />
    </StyledFullScreenContainer>
  );
}
