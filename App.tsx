import React from 'react';
import {Platform} from 'react-native';
import * as Sentry from './sentry';
import {Provider} from 'react-redux';
import {AppLoading} from 'expo';
import firebase from 'firebase';
import 'firebase/firestore';
import {env} from './constants';
import {RootNavigator} from './navigations/RootNavigator';
import {UserContext} from './helpers';
import {store} from './store';
import {SignUpData} from './models';

Sentry.init({
  dsn: env.sentry.dsn,
  enableInExpoDevelopment: false,
  debug: false,
  environment: Platform.OS,
  release: 'casasdepaz@1.0.1',
});

try {
  firebase.initializeApp({...env.firebase});
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

export default function App() {
  const [loading, toggleLoading] = React.useState(true);
  const [user, setUser] = React.useState<SignUpData>({});
  React.useEffect(() => {
    firebase.auth().languageCode = 'pt-BR';
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user !== null) {
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              setUser(doc.data());
            } else {
              console.log('No such document!');
            }
            toggleLoading(false);
          })
          .catch(function(error) {
            console.log('Error getting document:', error);
            toggleLoading(false);
          });
      } else {
        toggleLoading(false);
      }
    });
  }, []);
  return loading ? (
    <AppLoading />
  ) : (
    <UserContext.Provider value={{user, setUser}}>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </UserContext.Provider>
  );
}
