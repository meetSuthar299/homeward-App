import React from 'react';

import useTheme from '../hooks/useTheme';
import TextHW from './TextHW';

const FormLabel = props => {
  const { style, labelText, ...other } = props;

  const { theme } = useTheme();

  return (
    <TextHW
      style={[
        {
          marginBottom: 5,
          fontSize: 20,
          color: theme.backgroundTextColor
        },
        style
      ]}
      {...other}
    >
      {labelText}
    </TextHW>
  );
};

export default FormLabel;
