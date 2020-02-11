import React from "react";
import { Image, TouchableOpacity, StatusBar } from "react-native";
import firebase from "firebase";
import * as Sentry from "sentry-expo";
import styled from "styled-components/native";
import { FullScreenContainer, GradientButton, SolidButton } from "components";
import { UserContext } from "helpers";
import { colors } from "../../constants";
import { NavigationProps } from "../../models";
import { PlacesList } from "components/PlacesList";

const StyledFullScreenContainer = styled(FullScreenContainer)`
  align-items: flex-start;
  padding: ${StatusBar.currentHeight + 23}px 0px 16px 0px;
  width: 100%;
`;

const StyledHorizontalPadding = styled.View`
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
`;

const StyledHeader = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
`;

const StyledNameText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  line-height: 24px;
  color: ${colors.green};
`;

const FillScreenContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const StyledSubHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
`;

const StyledTitle = styled.Text`
  color: ${colors.red};
  font-size: 26px;
  font-weight: bold;
  line-height: 31px;
  width: 100%;
`;

const StyledActivityIndicator = styled.ActivityIndicator`
  flex: 1;
  align-self: center;
  justify-content: center;
`;

export function Main({ navigation }: NavigationProps): JSX.Element {
  const {
    user: { uid, name, surname }
  } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(true);
  const [places, setPlaces] = React.useState([]);

  const fetchPlaces = () => {
    setLoading(true);
    firebase
      .firestore()
      .collection(`users/${uid}/places`)
      .get()
      .then(querySnapshot => {
        const userPlaces = [];
        querySnapshot.forEach(doc =>
          userPlaces.push({ id: doc.id, ...doc.data() })
        );
        setPlaces(userPlaces);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
        Sentry.captureException(error);
      });
  };
  navigation.addListener("willFocus", fetchPlaces);

  return (
    <StyledFullScreenContainer>
      <StyledHeader>
        <StyledNameText>{`${name} ${surname}`}</StyledNameText>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("assets/images/ic_gear.png")}
            style={{ width: 24, height: 24, tintColor: colors.green }}
          />
        </TouchableOpacity>
      </StyledHeader>
      <StyledSubHeader>
        <Image
          source={require("assets/images/ic_casasdepaz.png")}
          style={{
            width: 24,
            height: 24,
            marginRight: 18,
            tintColor: colors.red
          }}
        />
        <StyledTitle>Casas de paz</StyledTitle>
      </StyledSubHeader>
      <FillScreenContainer>
        {loading && <StyledActivityIndicator size="large" color={colors.red} />}
        {!loading && (
          <PlacesList places={places} navigate={navigation.navigate} />
        )}
      </FillScreenContainer>
      <StyledHorizontalPadding>
        <GradientButton
          onPress={() => navigation.navigate("Meeting")}
          title="+ Cadastrar alvos de fé"
          colors={colors.gradient}
          textColor={colors.white}
        />
        <SolidButton
          transparent
          onPress={() => navigation.navigate("Info")}
          title="Saiba mais"
          color={colors.green}
        />
      </StyledHorizontalPadding>
    </StyledFullScreenContainer>
  );
}
