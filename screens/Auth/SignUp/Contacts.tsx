import React from "react";
import { StatusBar, BackHandler } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import isEmpty from "lodash/isEmpty";
import {
  FullScreenContainer,
  GradientButton,
  HeaderText,
  TextInput,
  Circle
} from "components";
import { getContactsData } from "store/selectors";
import { addPhoneMask } from "helpers";
import { updateSignUpData } from "store/actionCreators";
import { SignUpData } from "../../../models";
import { colors, emailRegex } from "../../../constants";

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

type Errors = {
  email?: string;
  phone?: string;
};

export function Contacts({ navigation: { navigate } }) {
  const dispatch = useDispatch();
  const { email, phone } = useSelector(getContactsData);

  const [errors, setErrors] = React.useState<Errors>({});

  const updateData = (payload: SignUpData) =>
    dispatch(updateSignUpData(payload));

  const setEmail = (email: string) => {
    updateData({ email });
    setErrors({ ...errors, email: undefined });
  };
  const setPhoneWithMask = (phone: string) => {
    updateData({ phone: addPhoneMask(phone) });
    setErrors({ ...errors, phone: undefined });
  };

  const onSubmit = () => {
    let errors: Errors = {};

    if (email === "") errors.email = "Email é obrigatório";
    if (phone === "") errors.phone = "Telefone é obrigatório";
    if (phone.length < 14) errors.phone = "Número incompleto";
    if (!emailRegex.test(String(email).toLowerCase())) {
      errors.email = "E-mail inválido";
    }

    if (isEmpty(errors)) {
      navigate("MoreInfo");
    } else {
      setErrors(errors);
    }
  };

  return (
    <StyledFullScreenContainer>
      <FillScreenContainer>
        <StyledHeaderText>Seus contatos</StyledHeaderText>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
        />
        <TextInput
          label="Telefone"
          value={phone}
          onChangeText={setPhoneWithMask}
          maxLength={15}
          keyboardType="phone-pad"
          error={errors.phone}
        />
      </FillScreenContainer>
      <TabsView>
        <Circle color={colors.gray} />
        <Circle color={colors.green} />
        <Circle color={colors.gray} />
        <Circle color={colors.gray} />
      </TabsView>
      <GradientButton
        onPress={onSubmit}
        title="Continuar"
        colors={colors.gradient}
        textColor={colors.white}
      />
    </StyledFullScreenContainer>
  );
}
