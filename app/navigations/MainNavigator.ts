// @flow
import { createStackNavigator } from "react-navigation-stack";
import {
  Main,
  Profile,
  MeetingRegistration,
  PlaceRegistration,
  Info,
  MeetingView
} from "screens/Main";

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
  MeetingRegistration: {
    screen: MeetingRegistration,
    navigationOptions: {
      headerShown: false
    }
  },
  PlaceRegistration: {
    screen: PlaceRegistration,
    navigationOptions: {
      headerShown: false
    }
  },
  MeetingView: {
    screen: MeetingView,
    navigationOptions: {
      headerShown: false
    }
  }
});
