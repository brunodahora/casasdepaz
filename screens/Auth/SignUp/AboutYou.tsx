import React from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import {
  FullScreenContainer,
  SolidButton,
  GradientButton,
  HeaderText,
  TextInput
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
      <GradientButton
        onPress={() => console.log("Cadastrar")}
        title="Cadastrar"
        colors={colors.gradient}
        textColor={colors.white}
      />
    </StyledFullScreenContainer>
  );
}
