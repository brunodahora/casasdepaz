import React from "react";
import { BackHandler, Platform, KeyboardAvoidingView } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import isEmpty from "lodash/isEmpty";
import firebase from "firebase";
import "firebase/firestore";
import * as Sentry from "../../sentry";
import {
  FullScreenContainer,
  GradientButton,
  HeaderText,
  TextInput,
  BackButton
} from "components";
import { getMeetingData } from "store/selectors";
import { colors, emailRegex } from "../../constants";
import { addCpfMask, addPhoneMask, addTimeMask } from "helpers";
import { PlaceData } from "../../models";
import { updatePlaceData, clearPlaceData } from "store/actionCreators";

const StyledFullScreenContainer = styled(FullScreenContainer)`
  align-items: flex-start;
  padding: ${getStatusBarHeight() + 23}px 16px 0px 16px;
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
  padding-bottom: 16px;
`;

type Errors = {
  name?: string;
  time?: string;
  owner?: string;
  phone?: string;
  email?: string;
  partner?: string;
};

export function MeetingRegistration({ navigation: { navigate, getParam } }) {
  const dispatch = useDispatch();
  const { name, time, owner, phone, email, partner } = useSelector(
    getMeetingData
  );
  const [errors, setErrors] = React.useState<Errors>({});

  const id = getParam("id", null);
  const placeId = getParam("placeId", null);

  const updateData = (payload: PlaceData) => dispatch(updatePlaceData(payload));

  const setName = (name: string) => {
    updateData({ name });
    setErrors({ ...errors, name: undefined });
  };
  const setTimeWithMask = (time: string) => {
    updateData({ time: addTimeMask(time) });
    setErrors({ ...errors, time: undefined });
  };
  const setOwner = (owner: string) => {
    updateData({ owner });
    setErrors({ ...errors, owner: undefined });
  };
  const setPhoneWithMask = (phone: string) => {
    updateData({ phone: addPhoneMask(phone) });
    setErrors({ ...errors, phone: undefined });
  };
  const setEmail = (email: string) => {
    updateData({ email });
    setErrors({ ...errors, email: undefined });
  };
  const setPartnerWithMask = (partner: string) => {
    updateData({ partner: addCpfMask(partner) });
    setErrors({ ...errors, partner: undefined });
  };

  const onSubmit = () => {
    let errors: Errors = {};

    if (name === "") errors.name = "Nome é obrigatório";
    if (time === "") errors.time = "Horário é obrigatório";
    if (owner === "") errors.owner = "Proprietário é obrigatório";
    if (phone === "") errors.phone = "Telefone é obrigatório";
    if (phone && phone.length < 14) errors.phone = "Número incompleto";
    if (email && !emailRegex.test(String(email).toLowerCase())) {
      errors.email = "E-mail inválido";
    }
    if (partner && partner.length < 14)
      errors.partner = "CPF da Dupla incompleto";

    if (isEmpty(errors)) {
      navigate("PlaceRegistration", { id, placeId });
    } else {
      setErrors(errors);
    }
  };

  const handleBackPress = () => {
    dispatch(clearPlaceData());
    const destination = placeId ? "MeetingView" : "Main";
    navigate(destination, { id, placeId });
    return true;
  };

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backHandler.remove();
  });

  React.useEffect(() => {
    if (placeId) {
      firebase
        .firestore()
        .collection("places")
        .doc(placeId)
        .get()
        .then(doc => {
          if (doc.exists) {
            dispatch(updatePlaceData(doc.data()));
          } else {
            console.log("No such document!");
          }
        })
        .catch(error => {
          console.log(error);
          Sentry.captureException(error);
        });
    }
  }, [placeId]);

  return (
    <StyledFullScreenContainer>
      <ScrollViewContainer>
        <KeyboardAvoidingView behavior="padding" enabled>
          {Platform.OS !== "android" && (
            <BackButton onPress={handleBackPress} />
          )}
          <StyledHeaderText>Dados do encontro</StyledHeaderText>
          <TextInput
            label="Nome do local"
            value={name}
            onChangeText={setName}
            error={errors.name}
            placeholder="Casa do João"
          />
          <TextInput
            label="Horário"
            value={time}
            onChangeText={setTimeWithMask}
            error={errors.time}
            keyboardType="number-pad"
            maxLength={13}
            placeholder="18:00 - 19:00"
          />
          <TextInput
            label="Nome do proprietário"
            value={owner}
            onChangeText={setOwner}
            error={errors.owner}
            placeholder="João da Silva"
          />
          <TextInput
            label="Telefone do proprietário"
            value={phone}
            onChangeText={setPhoneWithMask}
            error={errors.phone}
            placeholder="(41) 98765-4321"
            keyboardType="phone-pad"
          />
          <TextInput
            label="E-mail do proprietário"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            placeholder="joao.silva@casasdepaz.com.br"
            keyboardType="email-address"
          />
          <TextInput
            label="CPF da dupla para a casa de paz (se sozinho, não obrigatório)"
            value={partner}
            onChangeText={setPartnerWithMask}
            maxLength={14}
            error={errors.partner}
            placeholder="123.456.789-09"
            keyboardType="number-pad"
          />
          <PaddingBottom />
        </KeyboardAvoidingView>
      </ScrollViewContainer>
      <GradientButton
        onPress={onSubmit}
        title={"Continuar"}
        colors={colors.gradient}
        textColor={colors.white}
      />
      <PaddingBottom />
    </StyledFullScreenContainer>
  );
}
