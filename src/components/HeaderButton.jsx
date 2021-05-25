import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { TouchableHighlight } from 'react-native';

import useTheme from '../hooks/useTheme';

const HeaderButton = ({ iconName, iconSize = 28, onPress }) => {
  const { theme } = useTheme();

  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={1}
      underlayColor={
        theme.isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
      }
      style={{ padding: 2, borderRadius: 20 }}
    >
      <FontAwesome5
        name={iconName}
        size={iconSize}
        color={theme.isDark ? 'silver' : theme.primaryTextColor}
      />
    </TouchableHighlight>
  );
};

export default HeaderButton;
