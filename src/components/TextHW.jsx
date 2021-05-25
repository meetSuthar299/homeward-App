import React from 'react';
import { Text } from 'react-native';

const TextHW = props => {
  const { bold, children, style, ...other } = props;

  return (
    <Text
      style={[{ fontFamily: bold ? 'AeonikBold' : 'AeonikRegular' }, style]}
      {...other}
    >
      {children}
    </Text>
  );
};

export default TextHW;
