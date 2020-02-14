import React from 'react';
import { BackHandler, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import isEmpty from 'lodash/isEmpty';
import {
  FullScreenContainer,
  GradientButton,
  HeaderText,
  TextInput,
  Circle,
  BackButton,
} from 'components';
import { getAboutYouData } from 'store/selectors';
import { colors } from '../../../constants';
import { addCpfMask } from 'helpers';
import { SignUpData } from '../../../models';
import { updateSignUpData, clearSignUpData } from 'store/actionCreators';

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

type Errors = {
  name?: string;
  surname?: string;
  cpf?: string;
};

export function AboutYou({ navigation: { navigate, goBack } }) {
  const dispatch = useDispatch();
  const { name, surname, cpf } = useSelector(getAboutYouData);

  const [errors, setErrors] = React.useState<Errors>({});

  const updateData = (payload: SignUpData) =>
    dispatch(updateSignUpData(payload));

  const setName = (name: string) => {
    updateData({ name });
    setErrors({ ...errors, name: undefined });
  };
  const setSurname = (surname: string) => {
    updateData({ surname });
    setErrors({ ...errors, surname: undefined });
  };
  const setCpfWithMask = (cpf: string) => {
    updateData({ cpf: addCpfMask(cpf) });
    setErrors({ ...errors, cpf: undefined });
  };

  const onSubmit = () => {
    let errors: Errors = {};

    if (name === '') errors.name = 'Nome é obrigatório';
    if (surname === '') errors.surname = 'Sobrenome é obrigatório';
    if (cpf === '') errors.cpf = 'CPF é obrigatório';
    if (cpf.length < 14) errors.cpf = 'CPF incompleto';

    if (isEmpty(errors)) {
      navigate('Contacts');
    } else {
      setErrors(errors);
    }
  };

  const handleBackPress = () => {
    dispatch(clearSignUpData());
    navigate('Initial');
    return true;
  };

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  });

  return (
    <StyledFullScreenContainer>
      <FillScreenContainer>
        {Platform.OS !== 'Android' && <BackButton onPress={handleBackPress} />}
        <StyledHeaderText>Sobre Você</StyledHeaderText>
        <TextInput
          label="Nome"
          value={name}
          onChangeText={setName}
          error={errors.name}
        />
        <TextInput
          label="Sobrenome"
          value={surname}
          onChangeText={setSurname}
          error={errors.surname}
        />
        <TextInput
          label="CPF"
          value={cpf}
          onChangeText={setCpfWithMask}
          maxLength={14}
          error={errors.cpf}
        />
      </FillScreenContainer>
      <TabsView>
        <Circle color={colors.green} />
        <Circle color={colors.gray} />
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
