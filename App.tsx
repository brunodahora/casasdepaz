import React from "react";
import * as Sentry from "sentry-expo";
import { AppLoading } from "expo";
import firebase from "firebase";
import { env } from "./constants";
import { RootNavigator } from "./navigations/RootNavigator";
import { UserContext } from "./helpers";

// Sentry.enableInExpoDevelopment = true;

Sentry.init({
  dsn: env.sentry.dsn,
  enableInExpoDevelopment: false,
  debug: false
});

try {
  firebase.initializeApp({ ...env.firebase });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

export default function App() {
  const [loading, toggleLoading] = React.useState(true);
  const [user, setUser] = React.useState<firebase.User | {}>({});
  React.useEffect(() => {
    firebase.auth().languageCode = "pt-BR";
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user !== null) {
        setUser(user);
      }
      toggleLoading(false);
    });
  });
  return loading ? (
    <AppLoading />
  ) : (
    <UserContext.Provider value={{ user, setUser }}>
      <RootNavigator />
    </UserContext.Provider>
  );
}
