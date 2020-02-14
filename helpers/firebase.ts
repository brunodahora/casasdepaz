import firebase from 'firebase';
import 'firebase/firestore';
import * as Sentry from '../sentry';

export const addPlaceToUser = ({
  uid,
  placeId,
  name,
  callback,
  errorCallback,
}) => {
  firebase
    .firestore()
    .collection(`users/${uid}/places`)
    .add({
      placeId,
      name,
    })
    .then(callback)
    .catch(error => {
      errorCallback();
      console.log('Error adding place to user: ', error);
      Sentry.captureException(error);
    });
};

export const addPlaceToPartner = ({
  partner,
  placeId,
  callback,
  errorCallback,
}) => {
  firebase
    .firestore()
    .collection(`users`)
    .where('cpf', '==', partner.replace(/\D/g, ''))
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        firebase
          .firestore()
          .collection(`users/${doc.id}/places`)
          .add({
            placeId,
            name,
          })
          .then(callback)
          .catch(error => {
            errorCallback();
            console.log('Error adding place to partner: ', error);
            Sentry.captureException(error);
          });
      });
    })
    .catch(error => {
      errorCallback();
      console.log('Error finding partner: ', error);
      Sentry.captureException(error);
    });
};
