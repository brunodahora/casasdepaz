import React from "react";
import { Platform, KeyboardAvoidingView } from "react-native";
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
  BackButton,
  Picker
} from "components";
import { getPlaceData } from "store/selectors";
import { colors } from "../../constants";
import { addCepMask, UserContext } from "helpers";
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

const StyledActivityIndicator = styled.ActivityIndicator`
  align-self: center;
  justify-content: center;
  width: 100%;
`;

type Errors = {
  type?: string;
  otherType?: string;
  address?: string;
  cep?: string;
  neighborhood?: string;
  state?: string;
  city?: string;
};

export function PlaceRegistration({ navigation: { navigate, getParam } }) {
  const dispatch = useDispatch();
  const {
    type,
    otherType,
    address,
    cep,
    neighborhood,
    state,
    city,
    weekDay,
    time,
    name,
    owner,
    phone,
    email,
    partner
  } = useSelector(getPlaceData);

  const id = getParam("id", null);
  const placeId = getParam("placeId", null);

  const { user } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Errors>({});

  const updateData = (payload: PlaceData) => dispatch(updatePlaceData(payload));

  const setType = (type: string) => {
    updateData({ type });
    setErrors({ ...errors, type: undefined });
  };
  const setOtherType = (otherType: string) => {
    updateData({ otherType });
    setErrors({ ...errors, otherType: undefined });
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

  const createPlace = () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("places")
      .add({
        type,
        otherType,
        address,
        cep,
        neighborhood,
        state,
        city,
        weekDay,
        time,
        name,
        owner,
        phone,
        email,
        partner,
        userId: user.uid
      })
      .then(place => {
        firebase
          .firestore()
          .collection(`users/${user.uid}/places`)
          .add({
            placeId: place.id,
            name
          })
          .then(() => {
            dispatch(clearPlaceData());
            navigate("Main");
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            console.log("Error adding place to user: ", error);
            Sentry.captureException(error);
          });

        if (partner) {
          firebase
            .firestore()
            .collection(`users`)
            .where("cpf", "==", partner.replace(/\D/g, ""))
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                firebase
                  .firestore()
                  .collection(`users/${doc.id}/places`)
                  .add({
                    placeId: place.id,
                    name
                  })
                  .then(() => {
                    dispatch(clearPlaceData());
                    navigate("Main");
                    setLoading(false);
                  })
                  .catch(error => {
                    setLoading(false);
                    console.log("Error adding place to partner: ", error);
                    Sentry.captureException(error);
                  });
              });
            })
            .catch(error => {
              setLoading(false);
              console.log("Error finding partner: ", error);
              Sentry.captureException(error);
            });
        }
      })
      .catch(error => {
        setLoading(false);
        console.log("Error adding place: ", error);
        Sentry.captureException(error);
      });
  };

  const savePlace = () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("places")
      .doc(placeId)
      .set({
        type,
        otherType,
        address,
        cep,
        neighborhood,
        state,
        city,
        weekDay,
        time,
        name,
        owner,
        phone,
        email,
        partner
      })
      .then(() => {
        firebase
          .firestore()
          .collection(`users/${user.uid}/places`)
          .doc(id)
          .update({
            placeId,
            name
          })
          .then(() => {
            dispatch(clearPlaceData());
            navigate("Main");
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            console.log(`Error updating place ${placeId} to user: `, error);
            Sentry.captureException(error);
          });

        if (partner) {
          firebase
            .firestore()
            .collection(`users`)
            .where("cpf", "==", partner.replace(/\D/g, ""))
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                firebase
                  .firestore()
                  .collection(`usePlaces/${doc.id}/places`)
                  .doc(id)
                  .update({
                    placeId,
                    name
                  })
                  .then(() => {
                    dispatch(clearPlaceData());
                    navigate("Main");
                    setLoading(false);
                  })
                  .catch(error => {
                    setLoading(false);
                    console.log(
                      `Error updating place ${placeId} to partner: `,
                      error
                    );
                    Sentry.captureException(error);
                  });
              });
            })
            .catch(error => {
              setLoading(false);
              console.log("Error finding partner: ", error);
              Sentry.captureException(error);
            });
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(`Error updating place ${placeId}: `, error);
        Sentry.captureException(error);
      });
  };

  const onSubmit = () => {
    let errors: Errors = {};

    if (type === "") errors.address = "Tipo é obrigatório";
    if (type === "Outros" && otherType === "")
      errors.address = "Tipo é obrigatório";
    if (address === "") errors.address = "Endereço é obrigatório";
    if (neighborhood === "") errors.neighborhood = "Bairro é obrigatório";
    if (state === "") errors.state = "Estado é obrigatório";
    if (city === "") errors.city = "Cidade é obrigatória";
    if (cep === "") errors.cep = "CEP é obrigatório";
    if (cep.length < 8) errors.cep = "CEP incompleto";

    if (isEmpty(errors)) {
      placeId ? savePlace() : createPlace();
    } else {
      setErrors(errors);
    }
  };

  const handleBackPress = () => navigate("MeetingRegistration");

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
      <StyledFullScreenContainer>
        <ScrollViewContainer>
          {Platform.OS !== "android" && (
            <BackButton onPress={handleBackPress} />
          )}
          <StyledHeaderText>Dados do encontro</StyledHeaderText>
          <Picker
            label="Tipo de local"
            error={errors.type}
            placeholder={{ label: "Selecione...", value: null }}
            options={[
              { label: "Casa", value: "Casa" },
              { label: "Empresa", value: "Empresa" },
              { label: "Escola", value: "Escola" },
              { label: "Universidade", value: "Universidade" },
              { label: "Outros", value: "Outros" }
            ]}
            selectedValue={type}
            onValueChange={setType}
          />
          {type === "Outros" && (
            <TextInput
              label="Digite o tipo do local"
              value={otherType}
              onChangeText={setOtherType}
              error={errors.otherType}
            />
          )}
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
            maxLength={9}
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
        </ScrollViewContainer>
        {loading ? (
          <StyledActivityIndicator size="large" color={colors.green} />
        ) : (
          <GradientButton
            onPress={onSubmit}
            title={placeId ? "Salvar" : "Cadastrar"}
            colors={colors.gradient}
            textColor={colors.white}
          />
        )}
        <PaddingBottom />
      </StyledFullScreenContainer>
    </KeyboardAvoidingView>
  );
}
