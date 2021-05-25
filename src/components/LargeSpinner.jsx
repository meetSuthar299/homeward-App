import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import useTheme from '../hooks/useTheme';

const LargeSpinner = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.backgroundColor,
        justifyContent: 'center'
      }}
    >
      <ActivityIndicator size='large' color={theme.primaryColor} />
    </View>
  );
};

export default LargeSpinner;
