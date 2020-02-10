import React from "react";
import {
  BackHandler,
  StatusBar,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import isEmpty from "lodash/isEmpty";
import firebase from "firebase";
import "firebase/firestore";
import * as Sentry from "sentry-expo";
import {
  FullScreenContainer,
  GradientButton,
  HeaderText,
  TextInput,
  BackButton
} from "components";
import { getMeetingData } from "store/selectors";
import { colors, emailRegex } from "../../constants";
import { UserContext, addCpfMask, addPhoneMask, addTimeMask } from "helpers";
import { PlaceData } from "../../models";
import { updatePlaceData, clearPlaceData } from "store/actionCreators";

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

const StyledActivityIndicator = styled.ActivityIndicator`
  align-self: center;
  justify-content: center;
  width: 100%;
`;

type Errors = {
  name?: string;
  time?: string;
  owner?: string;
  phone?: string;
  email?: string;
  partner?: string;
};

export function Meeting({ navigation: { navigate } }) {
  const dispatch = useDispatch();
  const { name, time, owner, phone, email, partner } = useSelector(
    getMeetingData
  );
  const { user, setUser } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);

  const [errors, setErrors] = React.useState<Errors>({});

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

  const createPlace = () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("places")
      .add({
        // type,
        // address,
        // cep,
        // neighborhood,
        // state,
        // city,
        time,
        name,
        owner,
        phone,
        email,
        partner
      })
      .then(place => {
        firebase
          .firestore()
          .collection(`users/${user.uid}/places`)
          .add({
            id: place.id,
            name
          })
          .then(() => {
            navigate("Main");
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            console.log("Error adding place to user: ", error);
            Sentry.captureException(error);
          });
      })
      .catch(error => {
        setLoading(false);
        console.log("Error adding place: ", error);
        Sentry.captureException(error);
      });
  };

  const onSubmit = () => {
    let errors: Errors = {};

    if (name === "") errors.name = "Nome é obrigatório";
    // if (time === "") errors.time = "Horário é obrigatório";
    // if (owner === "") errors.owner = "Proprietário é obrigatório";
    // if (phone === "") errors.phone = "Telefone é obrigatório";
    if (phone && phone.length < 14) errors.phone = "Número incompleto";
    if (email && !emailRegex.test(String(email).toLowerCase())) {
      errors.email = "E-mail inválido";
    }
    if (partner && partner.length < 14)
      errors.partner = "CPF da Dupla incompleto";

    if (isEmpty(errors)) {
      // navigate("Place");
      createPlace();
    } else {
      setErrors(errors);
    }
  };

  const handleBackPress = () => {
    dispatch(clearPlaceData());
    navigate("Main");
    return true;
  };

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backHandler.remove();
  });

  return (
    <StyledFullScreenContainer>
      <ScrollViewContainer>
        <KeyboardAvoidingView behavior="padding" enabled>
          {Platform.OS === "ios" && <BackButton onPress={handleBackPress} />}
          <StyledHeaderText>Dados do encontro</StyledHeaderText>
          <TextInput
            label="Nome do local"
            value={name}
            onChangeText={setName}
            error={errors.name}
          />
          <TextInput
            label="Horário"
            value={time}
            onChangeText={setTimeWithMask}
            error={errors.time}
            keyboardType="number-pad"
            maxLength={13}
          />
          <TextInput
            label="Nome do proprietário"
            value={owner}
            onChangeText={setOwner}
            error={errors.owner}
          />
          <TextInput
            label="Telefone"
            value={phone}
            onChangeText={setPhoneWithMask}
            error={errors.phone}
          />
          <TextInput
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />
          <TextInput
            label="Dupla para a casa de paz"
            value={partner}
            onChangeText={setPartnerWithMask}
            maxLength={14}
            error={errors.partner}
          />
          {loading ? (
            <StyledActivityIndicator size="large" color={colors.green} />
          ) : (
            <GradientButton
              onPress={onSubmit}
              title="Cadastrar"
              colors={colors.gradient}
              textColor={colors.white}
            />
          )}
          <PaddingBottom />
        </KeyboardAvoidingView>
      </ScrollViewContainer>
    </StyledFullScreenContainer>
  );
}
