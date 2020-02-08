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
import { addPhoneMask } from "helpers";

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

export function Contacts({ navigation: { navigate } }) {
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const setPhoneWithMask = phone => setPhone(addPhoneMask(phone));

  return (
    <StyledFullScreenContainer>
      <FillScreenContainer>
        <StyledHeaderText>Seus contatos</StyledHeaderText>
        <TextInput label="Email" value={email} onChangeText={setEmail} />
        <TextInput
          label="Telefone"
          value={phone}
          onChangeText={setPhoneWithMask}
          maxLength={15}
        />
      </FillScreenContainer>
      <TabsView>
        <Circle color={colors.gray} />
        <Circle color={colors.green} />
        <Circle color={colors.gray} />
      </TabsView>
      <GradientButton
        onPress={() => navigate("Password")}
        title="Continuar"
        colors={colors.gradient}
        textColor={colors.white}
      />
    </StyledFullScreenContainer>
  );
}
