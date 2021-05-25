import Constants from 'expo-constants';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import React from 'react';

import firebase from '../scripts/firebase';

const providers = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook'
};

const GoogleConfig = {
  iosClientId: `942422012627-pfgpck3tdb6t93ukflfv9c49v2oafi03.apps.googleusercontent.com`,
  androidClientId: `942422012627-iinnolk6mlbatifngj1l1qgbfi6casfl.apps.googleusercontent.com`,
  iosStandaloneAppClientId: `942422012627-b4993h3g9dfbt906fejribcun54fvom7.apps.googleusercontent.com`,
  androidStandaloneAppClientId: `942422012627-o5oisc4u5t9tjhqrpcgnb54aer657h00.apps.googleusercontent.com`
};

const AuthContext = React.createContext({});

const AuthContextProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = React.useState(false);

  const authContext = React.useMemo(
    () => ({
      authenticated,
      setAuthenticated,
      providers,
      signInWithGoogleAsync: async () => await Google.logInAsync(GoogleConfig),
      signInWithFacebookAsync: async () => {
        await Facebook.initializeAsync({
          appId: Constants.manifest.facebookAppId
        });
        return await Facebook.logInWithReadPermissionsAsync();
      },
      fetchFirebaseSignInMethodsForEmail: async email =>
        await firebase.auth().fetchSignInMethodsForEmail(email),
      authFirebaseWithGoogleAsync: async token => {
        const credential = firebase.auth.GoogleAuthProvider.credential(token);
        return await firebase.auth().signInWithCredential(credential);
      },
      authFirebaseWithFacebookAsync: async token => {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        return await firebase.auth().signInWithCredential(credential);
      },
      signOut: async () => await firebase.auth().signOut()
    }),
    [authenticated]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
