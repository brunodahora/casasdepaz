import React from "react";
import styled from "styled-components/native";
import { colors, fontWeight } from "../constants";

type Place = { id: string; name: string; placeId: string };

type Props = {
  places: Array<Place>;
  navigate: (screen: string, params: { id: string }) => void;
};

const StyledEmptyText = styled.Text`
  font-size: 14px;
  font-weight: ${fontWeight.light};
  line-height: 16px;
  padding: 0 16px 0 16px;
  color: ${colors.transparentGreen};
`;

const StyledHR = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.green};
  border-radius: 0.5px;
`;

const StyledPlaceContainer = styled.TouchableOpacity`
  width: 100%;
  border-bottom-width: 1px;
  border-color: ${colors.green};
`;

const StyledPlaceTitle = styled.Text`
  font-size: 16px;
  line-height: 20px;
  padding: 16px;
  color: ${colors.darkGreen};
`;

const StyledPlaceList = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding-bottom: 210px;
`;

export const PlacesList = ({ places = [], navigate }: Props): JSX.Element => (
  <StyledPlaceList>
    {places.length === 0 && (
      <StyledEmptyText>Nenhuma casa cadastrada no momento</StyledEmptyText>
    )}
    {places.length > 0 && <StyledHR />}
    {places &&
      places.map(({ id, name, placeId }) => (
        <StyledPlaceContainer
          key={id}
          onPress={() => navigate("MeetingView", { id, placeId })}
        >
          <StyledPlaceTitle>{name}</StyledPlaceTitle>
        </StyledPlaceContainer>
      ))}
  </StyledPlaceList>
);
