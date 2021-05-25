import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
  LogBox
} from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { getRegionFromLocation } from '../api/geocode';
import Base64Image from '../components/Base64Image';
import LargeSpinner from '../components/LargeSpinner';
import TextButton from '../components/TextButton';
import TextHW from '../components/TextHW';
import useData from '../hooks/useData';
import useFirestore from '../hooks/useFirestore';
import useTheme from '../hooks/useTheme';
import firebase from '../scripts/firebase';
import { dateToString } from '../utils/date';

LogBox.ignoreLogs([
  // TODO how to serialize Firestore Timestamp object
  'Non-serializable values were found in the navigation state'
]);

const SinglePost = ({ route, navigation }) => {
  const item = route.params;

  const [loading, setLoading] = React.useState(false);
  const [region, setRegion] = React.useState(undefined);

  const { removePost } = useData();
  const { deletePost } = useFirestore();
  const { theme } = useTheme();

  const windowHeight = useWindowDimensions().height;
  const commonName = getCommonName(item.species);
  const isAuthor = firebase.auth().currentUser?.uid === item.uid;
  const formattedDate = dateToString(item.date.toDate());
  const isEmail = item.email !== '';
  const isPhoneNumber = item.phoneNumber !== '';

  React.useEffect(() => {
    const init = async () => {
      try {
        const region = await getRegionFromLocation(item.location);

        setRegion(region);
      } catch (e) {
        console.error(e);
      }
    };

    init();
  }, []);

  const onDelete = async () => {
    try {
      setLoading(true);

      await deletePost(item.id);

      removePost(item);

      navigation.popToTop();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  if (loading) {
    return <LargeSpinner />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: theme.backgroundColor }}
    >
      <Base64Image source={item.uri} style={{ height: windowHeight * 0.4 }} />

      <View style={{ margin: 10 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}
        >
          <TextHW
            style={{
              fontSize: 30,
              color: theme.backgroundTextColor
            }}
          >
            {`${item.lost ? 'Lost' : 'Found'} ${commonName}`}
          </TextHW>

          <FontAwesome5
            name='exclamation-circle'
            size={30}
            color={item.lost ? '#ff0000' : '#008800'}
          />
        </View>

        <TextHW style={{ color: theme.backgroundTextColor }}>
          {`Posted by ${item.username} • ${formattedDate}`}
        </TextHW>
        <Divider theme={theme} />

        <TextHW
          style={{
            fontSize: 16,
            textAlign: 'justify',
            color: theme.backgroundTextColor
          }}
        >
          {item.title}
        </TextHW>
        <Divider theme={theme} />

        {item.petName && (
          <>
            <InfoLine label='Pet Name' text={item.petName} theme={theme} />
            <Divider theme={theme} />
          </>
        )}

        {isPhoneNumber && (
          <InfoLine label='Phone #' text={item.phoneNumber} theme={theme} />
        )}

        {isEmail && <InfoLine label='Email' text={item.email} theme={theme} />}

        {!isEmail && !isPhoneNumber && (
          <>
            <InfoLine label='Contact Information' text='N/A' theme={theme} />
            <Divider theme={theme} />
          </>
        )}

        <InfoLine label='Location' text={item.location} theme={theme} />

        <Divider theme={theme} />

        {region && (
          <MapView
            region={region}
            minZoomLevel={15}
            loadingEnabled
            loadingIndicatorColor={theme.primaryColor}
            provider={PROVIDER_GOOGLE}
            style={{
              height: 250,
              borderRadius: 20
            }}
          >
            <Marker
              coordinate={region}
              title='Last seen location'
              pinColor={theme.primaryColor}
            />

            <Circle
              center={region}
              radius={100}
              strokeWidth={3}
              strokeColor={theme.primaryColor}
              fillColor={`${
                item.lost ? 'rgba(255,0,0,0.4)' : 'rgba(0,255,0,0.4)'
              } ${commonName}`}
            />
          </MapView>
        )}

        <Divider theme={theme} />

        {isAuthor && (
          <TextButton
            text='Delete Post'
            fontSize={20}
            bold
            color={theme.primaryTextColor}
            backgroundColor='#7d0000'
            onPress={onDelete}
            style={{ marginVertical: 5 }}
          />
        )}
      </View>
    </ScrollView>
  );
};

const getCommonName = species => {
  switch (species) {
    case 'canine':
      return 'Dog';
    case 'feline':
      return 'Cat';
    default:
      return 'Pet';
  }
};

const InfoLine = ({ label, text, theme }) => (
  <TextHW
    bold
    style={{
      fontSize: 18,
      color: theme.isDark ? theme.primaryLightColor : theme.primaryColor
    }}
  >
    {`${label}: `}
    <TextHW style={{ fontSize: 16, color: theme.backgroundTextColor }}>
      {text}
    </TextHW>
  </TextHW>
);

const Divider = ({ theme }) => (
  <View
    style={{
      marginVertical: 10,
      height: StyleSheet.hairlineWidth,
      backgroundColor: theme.isDark ? 'lightgray' : 'gray'
    }}
  />
);

export default SinglePost;
