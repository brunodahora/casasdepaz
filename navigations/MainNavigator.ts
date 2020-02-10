// @flow
import { createStackNavigator } from "react-navigation-stack";
import { Main, Profile, Meeting, Place } from "screens/Main";

export const MainNavigator = createStackNavigator({
  Main: {
    screen: Main,
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
