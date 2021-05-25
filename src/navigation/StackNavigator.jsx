import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import useAuth from '../hooks/useAuth';
import Home from '../screens/Home/Home';
import NewPost from '../screens/NewPost/NewPost';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp/SignUp';
import SinglePost from '../screens/SinglePost';
import UserProfile from '../screens/UserProfile/UserProfile';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { authenticated } = useAuth();
  const { theme } = useTheme();

  return (
    <>
      <StatusBar style='light' backgroundColor={theme.primaryDarkColor} />
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'AeonikRegular',
            fontSize: 22
          },
          headerStyle: {
            backgroundColor: theme.isDark
              ? theme.primaryDarkColor
              : theme.primaryColor
          },
          headerLeftContainerStyle: {
            marginLeft: 5
          },
          headerRightContainerStyle: {
            marginRight: 5
          },
          headerTintColor: theme.primaryTextColor,
          headerBackTitleVisible: false
        }}
      >
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'Homeward' }}
        />
        <Stack.Screen
          name='SinglePost'
          component={SinglePost}
          options={{
            title: 'View Post'
          }}
        />
        {authenticated ? (
          <>
            <Stack.Screen
              name='UserProfile'
              component={UserProfile}
              options={{
                title: 'Profile'
              }}
            />
            <Stack.Screen
              name='NewPost'
              component={NewPost}
              options={{ title: 'New Post' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name='SignIn'
              component={SignIn}
              options={{
                title: 'Sign In'
              }}
            />
            <Stack.Screen
              name='SignUp'
              component={SignUp}
              options={{
                title: 'Sign Up'
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
