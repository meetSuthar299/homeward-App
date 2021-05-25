import { useFormikContext } from 'formik';
import React from 'react';
import { View } from 'react-native';

import FormTextInput from '../../components/FormTextInput';
import TextButton from '../../components/TextButton';
import useTheme from '../../hooks/useTheme';
import { hexToRGB } from '../../utils/color';

const FormBody = () => {
  const { isValid, isSubmitting, submitForm } = useFormikContext();
  const { theme } = useTheme();

  const placeHolderTextColor = hexToRGB(theme.backgroundTextColor, 0.6);

  const submitDisabled = !isValid || isSubmitting;

  return (
    <View style={{ flex: 1 }}>
      <FormTextInput
        fieldName='username'
        label='Username'
        placeholder='Enter a username'
        placeholderTextColor={placeHolderTextColor}
        returnKeyType='done'
        containerStyle={{ marginBottom: 5 }}
      />

      <FormTextInput
        fieldName='phoneNumber'
        label='Phone #'
        placeholder='(optional)'
        placeholderTextColor={placeHolderTextColor}
        keyboardType='phone-pad'
        returnKeyType='done'
        containerStyle={{ marginBottom: 10 }}
      />

      <TextButton
        text='Create Account'
        color={theme.primaryTextColor}
        backgroundColor={theme.primaryColor}
        onPress={submitForm}
        disabled={submitDisabled}
        style={{ marginBottom: 15 }}
      />
    </View>
  );
};

export default FormBody;
