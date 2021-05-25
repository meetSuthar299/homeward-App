import React from 'react';
import { Image } from 'react-native';

import { isBase64 } from '../utils/string';

const defaultImage = require('../../assets/images/image-not-found.png');

const Base64Image = props => {
  const { source, ...other } = props;

  const renderBase64 = isBase64(source);

  return (
    <Image
      source={
        source
          ? renderBase64
            ? { uri: `data:image/png;base64,${source}` }
            : { uri: source }
          : null
      }
      defaultSource={defaultImage}
      progressiveRenderingEnabled
      {...other}
    />
  );
};

export default Base64Image;
