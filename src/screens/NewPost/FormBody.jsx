import { useFormikContext } from 'formik';
import React from 'react';
import { LogBox } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import FormTextInput from '../../components/FormTextInput';
import PhotoSelector from '../../components/PhotoSelector';
import TextButton from '../../components/TextButton';
import TextHW from '../../components/TextHW';
import useTheme from '../../hooks/useTheme';
import { hexToRGB } from '../../utils/color';
import GooglePlacesInput from './GooglePlacesInput';
import SpeciesPicker from './SpeciesPicker';

const FormBody = ({ isLost, photo, setPhoto }) => {
  const { isValid, isSubmitting, submitForm } = useFormikContext();
  const { theme } = useTheme();

  const placeHolderTextColor = hexToRGB(theme.backgroundTextColor, 0.6);

  const submitDisabled = !isValid || isSubmitting;

  React.useEffect(() => {
    // https://github.com/FaridSafi/react-native-google-places-autocomplete/issues/486#issuecomment-665602257
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps='handled'
      style={{
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: theme.backgroundColor
      }}
    >
      <TextHW
        style={{
          marginTop: 5,
          marginBottom: 10,
          fontSize: 38,
          textAlign: 'center',
          color: theme.isDark ? theme.primaryLightColor : theme.primaryColor
        }}
      >
        {`${isLost ? 'Lost' : 'Found'} a Pet`}
      </TextHW>

      <FormTextInput
        fieldName='title'
        label='Post Title'
        placeholder={`I ${isLost ? 'lost my pet...' : 'found a pet...'}`}
        placeholderTextColor={placeHolderTextColor}
        returnKeyType='done'
        containerStyle={{ marginBottom: 5 }}
      />

      {isLost && (
        <FormTextInput
          fieldName='petName'
          label='Pet Name'
          placeholder="What's your pet's name?"
          placeholderTextColor={placeHolderTextColor}
          returnKeyType='done'
          containerStyle={{ marginBottom: 5 }}
        />
      )}

      <SpeciesPicker fieldName='species' containerStyle={{ marginBottom: 5 }} />

      <GooglePlacesInput isLost={isLost} fieldName='location' />

      <FormTextInput
        fieldName='phoneNumber'
        label='Phone #'
        placeholder='(optional)'
        placeholderTextColor={placeHolderTextColor}
        keyboardType='phone-pad'
        returnKeyType='done'
        containerStyle={{ marginBottom: 5 }}
      />

      <FormTextInput
        fieldName='email'
        label='Email'
        placeholder='(optional)'
        placeholderTextColor={placeHolderTextColor}
        keyboardType='email-address'
        returnKeyType='done'
        containerStyle={{ marginBottom: 15 }}
      />

      <PhotoSelector
        photo={photo}
        setPhoto={setPhoto}
        title='Pet Photo'
        description={`Add a photo of the pet you ${isLost ? 'lost' : 'found'}.`}
        containerStyle={{ marginBottom: 15 }}
      />

      <TextButton
        text='Submit Post'
        color={theme.primaryTextColor}
        backgroundColor={theme.primaryColor}
        onPress={submitForm}
        disabled={submitDisabled}
        style={{ marginBottom: 15 }}
      />
    </KeyboardAwareScrollView>
  );
};

export default FormBody;
