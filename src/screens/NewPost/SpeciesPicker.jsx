import { useField } from 'formik';
import React from 'react';
import { Platform, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import FormError from '../../components/FormError';
import FormLabel from '../../components/FormLabel';
import useTheme from '../../hooks/useTheme';

const SpeciesPicker = ({ fieldName, containerStyle }) => {
  const [field, meta, helpers] = useField(fieldName);

  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          ...(Platform.OS !== 'android' && {
            zIndex: 10
          })
        },
        containerStyle
      ]}
    >
      <FormLabel labelText='Species' style={{ marginBottom: 10 }} />

      <DropDownPicker
        items={[
          { label: 'Dog', value: 'canine' },
          { label: 'Cat', value: 'feline' },
          { label: 'Other', value: 'other' }
        ]}
        containerStyle={{ height: 40 }}
        style={{
          borderColor: theme.isDark
            ? theme.primaryLightColor
            : theme.primaryColor,
          backgroundColor: theme.backgroundColor
        }}
        dropDownStyle={{
          backgroundColor: theme.backgroundColor,
          color: theme.backgroundTextColor
        }}
        placeholder='Select species'
        placeholderStyle={{ color: theme.backgroundTextColor }}
        labelStyle={{ color: theme.backgroundTextColor }}
        arrowColor={theme.primaryColor}
        onChangeItem={item => helpers.setValue(item.value)}
        onBlur={field.onBlur(fieldName)}
      />

      <FormError error={meta.error ? meta.error : ''} />
    </View>
  );
};

export default SpeciesPicker;
