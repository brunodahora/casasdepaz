import React from 'react';
import { Alert, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import firebase from 'firebase';
import * as Sentry from '../../sentry';
import styled from 'styled-components/native';
import {
  FullScreenContainer,
  SolidButton,
  GradientButton,
  HeaderText,
  TextInput,
  BackButton,
} from 'components';
import { UserContext } from 'helpers';
import { colors } from '../../constants';

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

const StyledActivityIndicator = styled.ActivityIndicator`
  align-self: center;
  justify-content: center;
  height: 120px;
  width: 100%;
`;

export function Login({ navigation: { navigate } }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { setUser } = React.useContext(UserContext);

  const attemptLogin = () => {
    setLoading(true);
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() =>
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(({ user: { uid } }) => {
            firebase
              .firestore()
              .collection('users')
              .doc(uid)
              .get()
              .then(doc => {
                if (doc.exists) {
                  setUser(doc.data());
                  setLoading(false);
                  navigate('Main');
                } else {
                  console.log('No such document!');
                }
              })
              .catch(error => {
                setLoading(false);
                console.log(error);
                Sentry.captureException(error);
              });
          })
          .catch(error => {
            setLoading(false);
            Alert.alert(
              'Erro ao efetuar o login.\nVerifique seu e-mail e/ou sua senha.',
            );
            console.log(error);
            Sentry.captureException(error);
          }),
      );
  };

  const handleBackPress = () => navigate('Initial');

  return (
    <StyledFullScreenContainer>
      <FillScreenContainer>
        {Platform.OS !== 'Android' && <BackButton onPress={handleBackPress} />}
        <StyledHeaderText>Log In</StyledHeaderText>
        <TextInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </FillScreenContainer>
      {loading ? (
        <StyledActivityIndicator size="large" color={colors.green} />
      ) : (
        <>
          <GradientButton
            onPress={() => attemptLogin()}
            title="Entrar"
            colors={colors.gradient}
            textColor={colors.white}
          />
          <SolidButton
            transparent
            onPress={() => navigate('SignUp')}
            title="Criar uma conta"
            color={colors.green}
          />
        </>
      )}
    </StyledFullScreenContainer>
  );
}
