// @flow
import { createStackNavigator } from "react-navigation-stack";
import { Main, Profile, Meeting, Place, Info } from "screens/Main";

export const MainNavigator = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      headerShown: false
    }
  },
  Info: {
    screen: Info,
    navigationOptions: {
      headerShown: false
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerShown: false
    }
  },
  Meeting: {
    screen: Meeting,
    navigationOptions: {
      headerShown: false
    }
  },
  Place: {
    screen: Place,
    navigationOptions: {
      headerShown: false
    }
  }
});
