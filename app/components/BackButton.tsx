import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { colors } from "../constants";

const StyledBackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 18px;
`;

const StyledBack = styled.Text`
  font-size: 18px;
  line-height: 21px;
  color: ${colors.lightBlue};
`;

type Props = {
  onPress: () => void;
};

export const BackButton = ({ onPress }: Props): JSX.Element => (
  <StyledBackButton onPress={onPress}>
    <Image
      source={require("assets/images/ic_keyboard_arrow_left.png")}
      style={{
        width: 24,
        height: 24,
        tintColor: colors.lightBlue
      }}
    />
    <StyledBack>Voltar</StyledBack>
  </StyledBackButton>
);
