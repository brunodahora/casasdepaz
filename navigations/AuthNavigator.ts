// @flow
import { createStackNavigator } from "react-navigation-stack";
import { Login, SignUp } from "../screens";

export const AuthNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerShown: false
    }
  }
});
