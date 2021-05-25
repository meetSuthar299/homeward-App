import React from 'react';
import { TouchableOpacity } from 'react-native';

import TextHW from './TextHW';

const TextButton = ({
  text,
  bold = false,
  fontSize = 18,
  color,
  backgroundColor,
  onPress,
  disabled = false,
  style
}) => (
  <TouchableOpacity
    style={[
      {
        padding: 10,
        borderRadius: 2,
        shadowColor: '#000',
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
          height: 2
        },
        elevation: 4,
        backgroundColor
      },
      style
    ]}
    activeOpacity={0.7}
    onPress={onPress}
    disabled={disabled}
  >
    <TextHW
      bold={bold}
      style={{
        textAlign: 'center',
        fontSize,
        color
      }}
    >
      {text}
    </TextHW>
  </TouchableOpacity>
);

export default TextButton;
