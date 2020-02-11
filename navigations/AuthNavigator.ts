// @flow
import { createStackNavigator } from "react-navigation-stack";
import { Initial, Login, Success } from "screens/Auth";
import { SignUpNavigator } from "./SignUpNavigator";

export const AuthNavigator = createStackNavigator({
  Initial: {
    screen: Initial,
    navigationOptions: {
      headerShown: false
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false
    }
  },
  SignUp: {
    screen: SignUpNavigator,
    navigationOptions: {
      headerShown: false
    }
  },
  Success: {
    screen: Success,
    navigationOptions: {
      headerShown: false
    }
  }
});
