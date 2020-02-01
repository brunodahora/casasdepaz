// @flow
import { createStackNavigator } from "react-navigation-stack";
import { Main } from "../screens";

export const MainNavigator = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      headerShown: false
    }
  }
});
