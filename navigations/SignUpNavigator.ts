import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { AboutYou } from "screens/Auth/SignUp";

export const SignUpNavigator = createMaterialTopTabNavigator(
  {
    AboutYou: {
      screen: AboutYou
    }
  },
  {
    swipeEnabled: true,
    tabBarComponent: null
  }
);
