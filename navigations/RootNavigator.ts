// @flow
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { AuthNavigator } from "./AuthNavigator";
import { MainNavigator } from "./MainNavigator";

const SwitchNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Main: MainNavigator
});
export const RootNavigator = createAppContainer(SwitchNavigator);
