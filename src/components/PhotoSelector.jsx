import React from 'react';
import { View } from 'react-native';

import Base64Image from '../components/Base64Image';
import useTheme from '../hooks/useTheme';
import { selectPhoto } from '../utils/photo';
import TextButton from './TextButton';
import TextHW from './TextHW';

const PhotoSelector = ({
  photo,
  setPhoto,
  title,
  description,
  containerStyle
}) => {
  const { theme } = useTheme();

  const onSelectPhoto = async () => {
    try {
      const photo = await selectPhoto();
      setPhoto(photo);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={[{ flexDirection: 'row' }, containerStyle]}>
      <Base64Image
        source={photo}
        style={{
          flex: 2,
          height: 120,
          borderWidth: 1,
          borderColor: theme.primaryColor
        }}
      />

      <View
        style={{
          flex: 3,
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginHorizontal: 5
        }}
      >
        <TextHW
          bold
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: theme.backgroundTextColor
          }}
        >
          {title}
        </TextHW>

        <TextHW
          style={{
            textAlign: 'center',
            color: theme.backgroundTextColor
          }}
        >
          {description}
        </TextHW>

        <TextButton
          text='Select photo'
          bold
          fontSize={14}
          color={theme.primaryTextColor}
          backgroundColor={
            theme.isDark ? theme.secondaryLightColor : theme.secondaryColor
          }
          onPress={onSelectPhoto}
        />
      </View>
    </View>
  );
};

export default PhotoSelector;
