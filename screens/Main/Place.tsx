import React from "react";
import { StatusBar, Platform, KeyboardAvoidingView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import isEmpty from "lodash/isEmpty";
import {
  FullScreenContainer,
  GradientButton,
  HeaderText,
  TextInput,
  BackButton,
  Picker
} from "components";
import { getPlaceData } from "store/selectors";
import { colors, emailRegex } from "../../constants";
import { addCepMask } from "helpers";
import { PlaceData } from "../../models";
import { updatePlaceData } from "store/actionCreators";

const StyledFullScreenContainer = styled(FullScreenContainer)`
  align-items: flex-start;
  padding: ${StatusBar.currentHeight + 23}px 16px 0px 16px;
  width: 100%;
`;

const StyledHeaderText = styled(HeaderText)`
  margin: 0 0 60px 5px;
`;

const ScrollViewContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const PaddingBottom = styled.View`
  padding-bottom: 32px;
`;

type Errors = {
  type?: string;
  address?: string;
  cep?: string;
  neighborhood?: string;
  state?: string;
  city?: string;
};

export function Place({ navigation: { navigate } }) {
  const dispatch = useDispatch();
  const { type, address, cep, neighborhood, state, city } = useSelector(
    getPlaceData
  );

  const [errors, setErrors] = React.useState<Errors>({});

  const updateData = (payload: PlaceData) => dispatch(updatePlaceData(payload));

  const setType = (type: string) => {
    updateData({ type });
    setErrors({ ...errors, type: undefined });
  };
  const setAddress = (address: string) => {
    updateData({ address });
    setErrors({ ...errors, address: undefined });
  };
  const setCepWithMask = (cep: string) => {
    updateData({ cep: addCepMask(cep) });
    setErrors({ ...errors, cep: undefined });
  };
  const setNeighborhood = (neighborhood: string) => {
    updateData({ neighborhood });
    setErrors({ ...errors, neighborhood: undefined });
  };
  const setState = (state: string) => {
    updateData({ state });
    setErrors({ ...errors, state: undefined });
  };
  const setCity = (city: string) => {
    updateData({ city });
    setErrors({ ...errors, city: undefined });
  };

  const onSubmit = () => {
    let errors: Errors = {};

    if (address === "") errors.address = "Endereço é obrigatório";
    if (neighborhood === "") errors.neighborhood = "Bairro é obrigatório";
    if (state === "") errors.state = "Estado é obrigatório";
    if (city === "") errors.city = "Cidade é obrigatória";
    if (cep === "") errors.cep = "CEP é obrigatório";
    if (cep.length < 8) errors.cep = "CEP incompleto";

    if (isEmpty(errors)) {
      console.log("Cadastrar");
    } else {
      setErrors(errors);
    }
  };

  return (
    <StyledFullScreenContainer>
      <ScrollViewContainer>
        <KeyboardAvoidingView behavior="padding" enabled>
          {Platform.OS === "ios" && <BackButton onPress={handleBackPress} />}
          <StyledHeaderText>Dados do encontro</StyledHeaderText>
          <Picker
            label="Tipo de local"
            error={errors.type}
            placeholder={{ label: "Selecione...", value: null }}
            options={[
              { label: "Casa", value: "Casa" },
              { label: "Empresa", value: "Empresa" },
              { label: "Escola", value: "Escola" },
              { label: "Universidade", value: "Universidade" }
            ]}
            selectedValue={type}
            onValueChange={setType}
          />
          <TextInput
            label="Endereço"
            value={address}
            onChangeText={setAddress}
            error={errors.address}
          />
          <TextInput
            label="CEP"
            value={cep}
            onChangeText={setCepWithMask}
            error={errors.cep}
            keyboardType="number-pad"
            maxLength={8}
          />
          <TextInput
            label="Bairro"
            value={neighborhood}
            onChangeText={setNeighborhood}
            error={errors.neighborhood}
          />
          <TextInput
            label="Estado"
            value={state}
            onChangeText={setState}
            error={errors.state}
          />
          <TextInput
            label="Cidade"
            value={city}
            onChangeText={setCity}
            error={errors.city}
          />
          <GradientButton
            onPress={onSubmit}
            title="Cadastrar"
            colors={colors.gradient}
            textColor={colors.white}
          />
          <PaddingBottom />
        </KeyboardAvoidingView>
      </ScrollViewContainer>
    </StyledFullScreenContainer>
  );
}
