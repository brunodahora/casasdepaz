import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { AboutYou, Contacts, Password } from "screens/Auth/SignUp";

export const SignUpNavigator = createMaterialTopTabNavigator(
  {
    AboutYou: {
      screen: AboutYou
    },
    Contacts: {
      screen: Contacts
    },
    Password: {
      screen: Password
    }
  },
  {
    swipeEnabled: true,
    tabBarComponent: null
  }
);
