import { Formik } from 'formik';
import React from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';

import Base64Image from '../../components/Base64Image';
import HeaderButton from '../../components/HeaderButton';
import LargeSpinner from '../../components/LargeSpinner';
import ModalPrompt from '../../components/ModalPrompt';
import TextButton from '../../components/TextButton';
import TextHW from '../../components/TextHW';
import useAuth from '../../hooks/useAuth';
import useFirestore from '../../hooks/useFirestore';
import useTheme from '../../hooks/useTheme';
import firebase from '../../scripts/firebase';
import { selectPhoto } from '../../utils/photo';
import FormBody from './FormBody';

const UserProfile = ({ navigation }) => {
  const [photo, setPhoto] = React.useState(undefined);
  const [loading, setLoading] = React.useState(true);
  const [updateModalVisible, setUpdateModalVisible] = React.useState(false);
  const [signOutModalVisible, setSignOutModalVisible] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    email: '',
    username: '',
    phoneNumber: ''
  });

  const { signOut } = useAuth();
  const { getUser, updateUser } = useFirestore();
  const { theme } = useTheme();

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = firebase.auth().currentUser;
        const userDoc = await getUser(currentUser.uid);
        const userData = userDoc.data();

        setUserInfo(userData);

        if (userData?.photoURL) {
          setPhoto(userData.photoURL);
        }

        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUserData();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton iconName='sign-out-alt' onPress={toggleSignOutModal} />
      )
    });
  }, [navigation]);

  const toggleSignOutModal = React.useCallback(
    () => setSignOutModalVisible(prev => !prev),
    []
  );

  const onSelectPhoto = async () => {
    try {
      const photo = await selectPhoto();
      setPhoto(photo);
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = async values => {
    const data = {
      email: values.email,
      username: values.username,
      phoneNumber: values.phoneNumber ?? '',
      photoURL: photo ?? ''
    };

    try {
      const currentUser = firebase.auth().currentUser;

      if (currentUser === null) {
        throw new Error('User is not authenticated to view UserProfile!');
      }

      await updateUser(currentUser.uid, data);

      setUpdateModalVisible(true);
    } catch (e) {
      console.error(e);
    }
  };

  const initialValues = {
    username: userInfo.username,
    email: userInfo.email,
    phoneNumber: userInfo.phoneNumber
  };

  if (loading) {
    return <LargeSpinner />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <Modal animationType='slide' transparent visible={updateModalVisible}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => setUpdateModalVisible(false)}
        >
          <TextHW
            style={{
              color: 'white',
              fontSize: 28,
              textAlign: 'center'
            }}
          >
            Profile updated!
          </TextHW>
        </TouchableOpacity>
      </Modal>

      <ModalPrompt
        isVisible={signOutModalVisible}
        onAccept={() => {
          toggleSignOutModal();
          signOut();
        }}
        onCancel={toggleSignOutModal}
        promptText='Are you sure you want to sign out?'
        acceptText='Sign Out'
        cancelText='Cancel'
      />

      <KeyboardAwareScrollView
        indicatorStyle={theme.isDark ? 'white' : 'black'}
      >
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Base64Image
            source={photo}
            style={{
              width: 150,
              height: 150,
              borderWidth: 1,
              borderRadius: 100,
              borderColor: theme.primaryColor
            }}
          />

          <TextButton
            text='Select Photo'
            color={theme.primaryTextColor}
            backgroundColor={theme.primaryColor}
            style={{ marginVertical: 10 }}
            onPress={onSelectPhoto}
          />
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <FormBody />
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
};

const validationSchema = yup.object({
  email: yup.string().required('* required field').email('* incorrect format'),
  username: yup
    .string()
    .required('* required field')
    .max(12, '* maximum 12 characters'),
  phoneNumber: yup.string().length(10, '* 10 digits required')
});

export default UserProfile;
