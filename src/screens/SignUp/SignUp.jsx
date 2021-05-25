import { Formik } from 'formik';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';

import LargeSpinner from '../../components/LargeSpinner';
import PhotoSelector from '../../components/PhotoSelector';
import TextHW from '../../components/TextHW';
import useAuth from '../../hooks/useAuth';
import useFirestore from '../../hooks/useFirestore';
import useTheme from '../../hooks/useTheme';
import FormBody from './FormBody';

const SignUp = ({ route }) => {
  const { provider, token, user } = route.params;

  const [photo, setPhoto] = React.useState(user.photoURL ?? '');

  const [loading, setLoading] = React.useState(false);

  const {
    providers,
    authFirebaseWithGoogleAsync,
    authFirebaseWithFacebookAsync
  } = useAuth();

  const { createUser } = useFirestore();

  const { theme } = useTheme();

  const onSubmit = async values => {
    try {
      setLoading(true);

      let userCredential = undefined;

      if (provider === providers.GOOGLE) {
        userCredential = await authFirebaseWithGoogleAsync(token);
      } else if (provider === providers.FACEBOOK) {
        userCredential = await authFirebaseWithFacebookAsync(token);
      }

      if (!userCredential) {
        throw new Error('Error retrieving userCredential from provider!');
      }

      const data = {
        email: userCredential.user.email,
        name: userCredential.user.displayName,
        phoneNumber: values.phoneNumber,
        photoURL: photo ?? '',
        posts: [],
        username: values.username
      };

      await createUser(userCredential.user.uid, data);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  if (loading) {
    return <LargeSpinner />;
  }

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: theme.backgroundColor
      }}
    >
      <TextHW
        style={{
          marginTop: 15,
          fontSize: 16,
          textAlign: 'center',
          color: theme.backgroundTextColor
        }}
      >
        {`You're almost signed up ${user.name.split(' ')[0]}!`}
      </TextHW>

      <TextHW
        style={{
          fontSize: 16,
          marginTop: 20,
          textAlign: 'center',
          color: theme.backgroundTextColor
        }}
      >
        Fill in the fields below and click Create Account!
      </TextHW>

      <PhotoSelector
        photo={photo}
        setPhoto={setPhoto}
        title='Profile Photo'
        description='Adding a photo can make it easier for others to creep on you.'
        containerStyle={{ marginVertical: 15 }}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={onSubmit}
      >
        <FormBody />
      </Formik>
    </KeyboardAwareScrollView>
  );
};

const initialValues = {
  username: '',
  phoneNumber: ''
};

const ValidationSchema = yup.object({
  username: yup
    .string()
    .required('* required field')
    .max(12, '* maximum 12 characters'),
  phoneNumber: yup.string().length(10, '* 10 digits required')
});

export default SignUp;
