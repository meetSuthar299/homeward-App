import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

import LargeSpinner from '../components/LargeSpinner';
import TextHW from '../components/TextHW';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';

const SignIn = ({ navigation }) => {
  const { theme } = useTheme();

  const {
    providers,
    signInWithGoogleAsync,
    signInWithFacebookAsync,
    fetchFirebaseSignInMethodsForEmail,
    authFirebaseWithGoogleAsync,
    authFirebaseWithFacebookAsync
  } = useAuth();

  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);

  const withGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogleAsync();

      if (result.type === 'success') {
        const methods = await fetchFirebaseSignInMethodsForEmail(
          result?.user?.email
        );

        if (methods.length === 0) {
          navigation.replace('SignUp', {
            provider: providers.GOOGLE,
            token: result?.idToken,
            user: {
              name: result?.user?.name,
              photoURL: result?.user?.photoUrl
            }
          });
        } else {
          await authFirebaseWithGoogleAsync(result?.idToken);
        }
      } else {
        setErrorMessage('Failed to sign in.');
      }
    } catch (error) {
      const errorCode = error.code;

      console.error(error);

      if (errorCode === 'auth/account-exists-with-different-credential') {
        setErrorMessage('Email already associated with another account.');
      } else {
        setErrorMessage('There was an error signing in. Try again.');
      }
    }
    setLoading(false);
  };

  const withFacebook = async () => {
    setLoading(true);
    try {
      const { type, token } = await signInWithFacebookAsync();

      if (type === 'success') {
        const response = await fetch(
          `https://graph.facebook.com/me?fields=email,name,picture&access_token=${encodeURIComponent(
            token
          )}`
        );

        if (!response.ok) throw new Error('Error fetching facebook email');

        const result = await response.json();

        const methods = await fetchFirebaseSignInMethodsForEmail(result?.email);

        if (methods.length === 0) {
          navigation.replace('SignUp', {
            provider: providers.FACEBOOK,
            token,
            user: {
              name: result?.name,
              photoURL: result?.picture?.data?.url
            }
          });
        } else {
          await authFirebaseWithFacebookAsync(token);
        }
      } else {
        setErrorMessage('Failed to sign in.');
      }
    } catch (error) {
      const errorCode = error.code;

      console.error(error);

      if (errorCode === 'auth/account-exists-with-different-credential') {
        setErrorMessage('Email already associated with another account.');
      } else {
        setErrorMessage('There was an error signing in. Try again.');
      }
    }
    setLoading(false);
  };

  return loading ? (
    <LargeSpinner />
  ) : (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.backgroundColor
      }}
    >
      <View
        style={{
          flex: 1,
          marginHorizontal: '10%',
          paddingVertical: 30,
          shadowColor: '#000',
          shadowOpacity: 1,
          shadowRadius: 1,
          shadowOffset: {
            height: 1
          },
          elevation: 8,
          backgroundColor: theme.secondaryBackgroundColor
        }}
      >
        <TextHW
          style={{
            textAlign: 'center',
            fontSize: 36,
            color: theme.backgroundTextColor
          }}
        >
          Homeward
        </TextHW>

        <View style={{ marginTop: 50 }}>
          <View
            style={{
              alignSelf: 'center',
              width: '75%',
              borderWidth: 1,
              shadowColor: '#000',
              shadowOpacity: 0.3,
              shadowRadius: 1,
              shadowOffset: {
                height: 1
              },
              elevation: 4
            }}
          >
            <FontAwesome5.Button
              name='google'
              size={28}
              color={theme.primaryTextColor}
              borderRadius={0}
              backgroundColor={theme.primaryColor}
              style={{ justifyContent: 'center' }}
              onPress={withGoogle}
            >
              Sign in with Google
            </FontAwesome5.Button>
          </View>

          <View
            style={{
              alignSelf: 'center',
              width: '75%',
              borderWidth: 1,
              shadowColor: '#000',
              shadowOpacity: 0.3,
              shadowRadius: 1,
              shadowOffset: {
                height: 1
              },
              elevation: 4,
              marginTop: 15
            }}
          >
            <FontAwesome5.Button
              name='facebook'
              size={28}
              color={theme.primaryTextColor}
              borderRadius={0}
              backgroundColor='#385499'
              style={{ justifyContent: 'center' }}
              onPress={withFacebook}
            >
              Sign in with Facebook
            </FontAwesome5.Button>
          </View>
        </View>

        {errorMessage && (
          <TextHW
            bold
            numberOfLines={2}
            style={{ marginVertical: 5, textAlign: 'center', color: 'crimson' }}
          >
            {errorMessage}
          </TextHW>
        )}
      </View>
    </View>
  );
};

export default SignIn;
