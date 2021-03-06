import React from "react";
import { View, Alert, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import isEmpty from "lodash/isEmpty";
import firebase from "firebase";
import "firebase/firestore";
import * as Sentry from "../../../sentry";
import {
  FullScreenContainer,
  GradientButton,
  HeaderText,
  TextInput,
  Circle,
  BackButton
} from "components";
import { getSignUpData } from "store/selectors";
import { updateSignUpData } from "store/actionCreators";
import { colors } from "../../../constants";
import { SignUpData, NavigationProps } from "../../../models";

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

const StyledActivityIndicator = styled.ActivityIndicator`
  align-self: center;
  justify-content: center;
  width: 100%;
`;

type Errors = {
  password?: string;
  confirmPassword?: string;
};

export function Password({
  navigation: { navigate }
}: NavigationProps): JSX.Element {
  const dispatch = useDispatch();
  const {
    name,
    surname,
    cpf,
    email,
    phone,
    hasCellGroup,
    gender,
    age,
    password,
    confirmPassword
  } = useSelector(getSignUpData);
  const [loading, setLoading] = React.useState(false);

  const [errors, setErrors] = React.useState<Errors>({});

  const updateData = (payload: SignUpData) =>
    dispatch(updateSignUpData(payload));

  const setPassword = (password: string) => {
    updateData({ password });
    setErrors({ ...errors, password: undefined, confirmPassword: undefined });
  };
  const setConfirmPassword = (confirmPassword: string) => {
    updateData({ confirmPassword });
    setErrors({ ...errors, password: undefined, confirmPassword: undefined });
  };

  const saveUserOnFirebase = ({ user }) => {-
    console.log("User: ", user);
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set({
        uid: user.uid,
        name,
        surname,
        cpf: cpf.replace(/\D/g, ""),
        email,
        phone: phone.replace(/\D/g, ""),
        hasCellGroup,
        gender,
        age
      });
    setLoading(false);
    navigate("Success");
  };

  const getError = (error: Error) => {
    let errorMessage = error.message;
    if (
      errorMessage === "The email address is already in use by another account."
    ) {
      errorMessage = "Email já cadastrado.";
    }
    return errorMessage;
  };

  const signUp = () => {
    setLoading(true);
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(
        () => View,
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(saveUserOnFirebase)
          .catch(error => {
            setLoading(false);
            console.log("Error signup: ", error);
            const errorMessage = `Oops! Algo deu errado no seu cadatro.\nEnvie uma mensagem via WhatsApp para (41) 999830607 para pedir ajuda.\n${getError(
              error
            )}`;
            if (Platform.OS === "web") {
              alert(errorMessage);
            } else {
              Alert.alert(errorMessage);
            }

            Sentry.captureException(error);
          })
      );
  };

  const onSubmit = () => {
    let errors: Errors = {};

    if (password === "") errors.password = "Senha é obrigatório";
    if (confirmPassword === "") errors.confirmPassword = "Confirme a senha";
    if (password !== confirmPassword) {
      errors.password = "Senha e confirmação diferentes";
      errors.confirmPassword = "Senha e confirmação diferentes";
    }
    if (password.length < 6) {
      errors.password = "Senha deve conter pelo menos 6 caracteres";
      errors.confirmPassword = "Senha deve conter pelo menos 6 caracteres";
    }

    if (isEmpty(errors)) {
      signUp();
    } else {
      setErrors(errors);
    }
  };

  return (
    <StyledFullScreenContainer>
      <FillScreenContainer>
        <BackButton onPress={() => navigate("MoreInfo")} />
        <StyledHeaderText>Cadastrar senha</StyledHeaderText>
        <TextInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          secureTextEntry
        />
        <TextInput
          label="Repetir Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors.confirmPassword}
          maxLength={20}
          secureTextEntry
        />
      </FillScreenContainer>
      <TabsView>
        <Circle color={colors.gray} />
        <Circle color={colors.gray} />
        <Circle color={colors.gray} />
        <Circle color={colors.green} />
      </TabsView>
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
    </StyledFullScreenContainer>
  );
}
