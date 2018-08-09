import * as React from 'react';
import { compose, lifecycle } from 'recompose';

const { firebase, firebaseui }: any = window;

// FirebaseUI config.
const uiConfig = {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/',
  tosUrl: '/terms',
};

const FirebaseAuth = () => <div id="firebaseui-auth-container" />;

export default compose(
  lifecycle({
    componentDidMount() {
      if (!firebase.auth().currentUser) {
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', uiConfig);
      }
    },
  }),
)(FirebaseAuth);
