import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { AboutYou, Contacts, MoreInfo, Password } from "screens/Auth/SignUp";

export const SignUpNavigator = createMaterialTopTabNavigator(
  {
    AboutYou: {
      screen: AboutYou
    },
    Contacts: {
      screen: Contacts
    },
    MoreInfo: {
      screen: MoreInfo
    },
    Password: {
      screen: Password
    }
  },
  {
    swipeEnabled: true,
    tabBarComponent: null,
    backBehavior: "order",
    lazy: true
  }
);
