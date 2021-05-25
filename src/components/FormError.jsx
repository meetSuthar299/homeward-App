import React from 'react';

import TextHW from './TextHW';

const FormError = ({ error }) => {
  return (
    <TextHW
      style={{
        color: 'crimson',
        fontSize: 14
      }}
    >
      {error}
    </TextHW>
  );
};

export default FormError;
