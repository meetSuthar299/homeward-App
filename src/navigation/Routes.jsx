import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import React from 'react';

import useAuth from '../hooks/useAuth';
import firebase from '../scripts/firebase';
import StackNavigator from './StackNavigator';

const Routes = () => {
  const [authLoaded, setAuthLoaded] = React.useState(false);
  const { setAuthenticated } = useAuth();

  const [fontsLoaded] = useFonts({
    AeonikRegular: require('../../assets/fonts/Aeonik-Regular.ttf'),
    AeonikBold: require('../../assets/fonts/Aeonik-Bold.ttf'),
    ...FontAwesome5.font
  });

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }

      if (!authLoaded) setAuthLoaded(true);
    });

    return unsubscribe;
  }, []);

  return authLoaded && fontsLoaded ? (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  ) : (
    <AppLoading />
  );
};

export default Routes;
