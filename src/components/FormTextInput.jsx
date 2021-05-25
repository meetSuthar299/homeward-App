import { useField } from 'formik';
import React from 'react';
import { TextInput, View } from 'react-native';

import useTheme from '../hooks/useTheme';
import FormError from './FormError';
import FormLabel from './FormLabel';

const FormTextInput = props => {
  const { fieldName, label, style, containerStyle, ...other } = props;

  const [field, meta] = useField(fieldName);

  const { theme } = useTheme();

  return (
    <View style={[{ flex: 1 }, containerStyle]}>
      <FormLabel labelText={label} />

      <TextInput
        value={field.value}
        onChangeText={field.onChange(fieldName)}
        onBlur={field.onBlur(fieldName)}
        style={[
          {
            paddingBottom: 5,
            borderBottomWidth: 2,
            fontSize: 18,
            fontFamily: 'AeonikRegular',
            color: theme.backgroundTextColor,
            borderBottomColor: theme.primaryColor
          },
          style
        ]}
        {...other}
      />

      <FormError error={meta.error && meta.touched ? meta.error : ''} />
    </View>
  );
};

export default FormTextInput;
