import React from 'react';
import { Image, Modal } from 'react-native';
import styled from 'styled-components/native';

import { GradientButton } from './GradientButton';
import { SolidButton } from './SolidButton';

import { colors, fontWeight } from '../constants';

const StyledBackground = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.transparentBlack}
`

const StyledContainer = styled.View`
  width: 75%;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white}
  border-radius: 12px;
  padding: 20px 27px;
`

const StyledText = styled.Text`
	color: ${colors.darkGreen};
	font-size: 16px;
	font-weight: ${fontWeight.medium};
	letter-spacing: -0.39px;
	line-height: 19px;
  text-align: center;
  margin: 30px 0px 40px 0px;
`

export const WarningModal = ({ message, confirmText, cancelText, confirmAction, cancelAction }) => (
  <Modal
    animationType="fade"
    transparent
    visible
    onRequestClose={cancelAction}>
    <StyledBackground>
      <StyledContainer>
        <Image
          source={require("assets/images/ic_alert.png")}
          style={{
            width: 92,
            height: 92,
          }}
          resizeMode="contain"
        />
        <StyledText>{message}</StyledText>
        <GradientButton
          onPress={confirmAction}
          title={confirmText}
          colors={colors.gradient}
          textColor={colors.white}
        />
        <SolidButton
          transparent
          onPress={cancelAction}
          title={cancelText}
          color={colors.green}
        />
      </StyledContainer>
    </StyledBackground>
  </Modal>
)