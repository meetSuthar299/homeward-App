import { Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';

import LargeSpinner from '../../components/LargeSpinner';
import firebase from '../../scripts/firebase';
import FormBody from './FormBody';

const NewPost = ({ navigation, route }) => {
  const { isLost } = route.params;

  const [loading, setLoading] = React.useState(false);
  const [photo, setPhoto] = React.useState(undefined);
  const [username, setUsername] = React.useState('Anonymous');

  const { createPost, getUser } = useFirestore();

  React.useEffect(() => {
    const getUserName = async () => {
      try {
        const currentUser = firebase.auth().currentUser;
        const userDocument = await getUser(currentUser.uid);
        const userData = userDocument.data();
        setUsername(userData.username);
      } catch (e) {
        console.error(e);
      }
    };

    getUserName();
  }, []);

  const onSubmit = async values => {
    try {
      setLoading(true);

      const currentUser = firebase.auth().currentUser;

      const post = {
        lost: isLost,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        email: values.email,
        location: values.location,
        phoneNumber: values.phoneNumber,
        species: values.species,
        title: values.title,
        uid: currentUser.uid,
        uri: photo ?? '',
        username
      };

      if (isLost) {
        post.petName = values.petName;
      }

      await createPost(post);

      navigation.popToTop();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return loading ? (
    <LargeSpinner />
  ) : (
    <Formik
      initialValues={isLost ? lostInitValues : foundInitValues}
      validationSchema={isLost ? lostValidationSchema : foundValidationSchema}
      validateOnMount
      onSubmit={onSubmit}
    >
      <FormBody isLost={isLost} photo={photo} setPhoto={setPhoto} />
    </Formik>
  );
};

const foundInitValues = {
  date: '',
  email: '',
  location: '',
  phoneNumber: '',
  species: '',
  title: ''
};

const lostInitValues = {
  ...foundInitValues,
  petName: ''
};

const schema = {
  email: yup.string().ensure().email(),
  location: yup.string().min(4).max(100).required(),
  phoneNumber: yup
    .string()
    .ensure()
    .matches(/^[0-9]{10}$/, {
      message: '* 10 digits required',
      excludeEmptyString: true
    }),
  species: yup.mixed().oneOf(['canine', 'feline', 'other']).required(),
  title: yup.string().min(10).max(250).required()
};

const foundValidationSchema = yup.object(schema);

const lostValidationSchema = yup.object({
  ...schema,
  petName: yup
    .string()
    .matches(/^[a-zA-Z]{1,10}$/, {
      message: '* letters only. 10 characters max.'
    })
    .required()
});

export default NewPost;
