// @flow
import { createStackNavigator } from "react-navigation-stack";
import { Initial, Login } from "screens/Auth";
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
  }
});
