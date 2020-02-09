import React from "react";
import * as Sentry from "sentry-expo";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import firebase from "firebase";
import "firebase/firestore";
import { env } from "./constants";
import { RootNavigator } from "./navigations/RootNavigator";
import { UserContext } from "./helpers";
import { store } from "./store";

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
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then(function(doc) {
            if (doc.exists) {
              setUser({ ...user, ...doc.data() });
            } else {
              console.log("No such document!");
            }
            setUser(user);
          })
          .catch(function(error) {
            console.log("Error getting document:", error);
          });
        toggleLoading(false);
      }
    });
  });
  return loading ? (
    <AppLoading />
  ) : (
    <UserContext.Provider value={{ user, setUser }}>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </UserContext.Provider>
  );
}
