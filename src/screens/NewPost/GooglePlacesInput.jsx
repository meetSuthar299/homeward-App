import { useField } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import FormError from '../../components/FormError';
import FormLabel from '../../components/FormLabel';
import useTheme from '../../hooks/useTheme';
import { hexToRGB } from '../../utils/color';

const GooglePlacesInput = ({ isLost, fieldName }) => {
  const { theme } = useTheme();

  const [field, meta, helpers] = useField(fieldName);

  const placeHolderTextColor = hexToRGB(theme.backgroundTextColor, 0.6);

  return (
    <View style={{ flex: 1 }}>
      <FormLabel labelText={`Location ${isLost ? 'Lost' : 'Found'}`} />

      <GooglePlacesAutocomplete
        placeholder='Search location'
        suppressDefaultStyles
        currentLocation
        currentLocationLabel='Current location'
        enablePoweredByContainer={false}
        onPress={(data, details = false) => {
          const location =
            data?.name ?? data?.description ?? 'Calgary, Alberta';

          helpers.setValue(location);
          helpers.setTouched(true, true);
        }}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          type: 'veterinary_care'
        }}
        GooglePlacesDetailsQuery={{
          fields: 'geometry'
        }}
        query={{
          key: 'AIzaSyBFMhipgj8TlR-Ia83dCacWBPl03AgFKFI',
          language: 'en',
          location: '51.049999,-114.066666',
          radius: '20',
          components: 'country:ca'
        }}
        textInputProps={{
          placeholderTextColor: placeHolderTextColor,
          returnKeyType: 'done'
        }}
        styles={{
          container: {
            flex: 1,
            marginBottom: 5
          },
          textInput: {
            paddingBottom: 5,
            borderBottomWidth: 2,
            fontSize: 18,
            fontFamily: 'AeonikRegular',
            color: theme.isDark ? 'cyan' : 'royalblue',
            borderBottomColor: theme.primaryColor
          },
          row: {
            backgroundColor: 'white',
            paddingVertical: 10,
            paddingLeft: 5
          },
          separator: {
            height: 0.5,
            backgroundColor: 'gray'
          },
          loader: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 20
          }
        }}
      />

      <FormError error={meta.error && meta.touched ? meta.error : ''} />
    </View>
  );
};

export default GooglePlacesInput;
