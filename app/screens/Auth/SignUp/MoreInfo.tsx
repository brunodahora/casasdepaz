import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import isEmpty from "lodash/isEmpty";
import {
  FullScreenContainer,
  GradientButton,
  HeaderText,
  TextInput,
  Circle,
  Picker,
  BackButton
} from "components";
import { getMoreInfoData } from "store/selectors";
import { colors } from "../../../constants";
import { SignUpData } from "../../../models";
import { updateSignUpData } from "../../../store/actionCreators";

const StyledFullScreenContainer = styled(FullScreenContainer)`
  align-items: flex-start;
  padding: ${getStatusBarHeight() + 23}px 16px 32px 16px;
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

const ScrollViewContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

type Errors = {
  hasCellGroup?: string;
  gender?: string;
  age?: string;
};

export function MoreInfo({ navigation: { navigate } }) {
  const dispatch = useDispatch();
  const { hasCellGroup, gender, age } = useSelector(getMoreInfoData);

  const [errors, setErrors] = React.useState<Errors>({});

  const updateData = (payload: SignUpData) =>
    dispatch(updateSignUpData(payload));

  const setHasCellGroup = (hasCellGroup: boolean) => {
    updateData({ hasCellGroup });
    setErrors({ ...errors, hasCellGroup: undefined });
  };
  const setGender = (gender: string) => {
    updateData({ gender });
    setErrors({ ...errors, gender: undefined });
  };
  const setAge = (age: string) => {
    updateData({ age });
    setErrors({ ...errors, age: undefined });
  };

  const onSubmit = () => {
    let errors: Errors = {};

    if (hasCellGroup === null) errors.hasCellGroup = "Selecione uma opção";
    if (gender === "") errors.gender = "Selecione uma opção";
    if (age === "") errors.age = "Idade é obrigatório";

    if (isEmpty(errors)) {
      navigate("Password");
    } else {
      setErrors(errors);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
      <ScrollViewContainer>
        <StyledFullScreenContainer>
          <FillScreenContainer>
            <BackButton onPress={() => navigate("Contacts")} />
            <StyledHeaderText>Mais uma coisinha</StyledHeaderText>
            <Picker
              label="Participa de uma célula da PIB Curitiba?"
              error={errors.hasCellGroup}
              placeholder={{ label: "Selecione...", value: null }}
              options={[
                { label: "Sim", value: true },
                { label: "Não", value: false }
              ]}
              selectedValue={hasCellGroup}
              onValueChange={setHasCellGroup}
            />
            <Picker
              label="Sexo"
              error={errors.gender}
              placeholder={{ label: "Selecione...", value: "" }}
              options={[
                { label: "Masculino", value: "Masculino" },
                { label: "Feminino", value: "Feminino" }
              ]}
              selectedValue={gender}
              onValueChange={setGender}
            />
            <TextInput
              label="Idade"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              error={errors.age}
            />
          </FillScreenContainer>
          <TabsView>
            <Circle color={colors.gray} />
            <Circle color={colors.gray} />
            <Circle color={colors.green} />
            <Circle color={colors.gray} />
          </TabsView>
          <GradientButton
            onPress={onSubmit}
            title="Continuar"
            colors={colors.gradient}
            textColor={colors.white}
          />
        </StyledFullScreenContainer>
      </ScrollViewContainer>
    </KeyboardAvoidingView>
  );
}
