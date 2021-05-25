import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

const selectPhoto = async () => {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission to access camera roll is required!');
      return;
    }
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    allowsMultipleSelection: false,
    aspect: [4, 3],
    quality: 0,
    base64: true,
    exif: false
  });

  return result?.base64;
};

export { selectPhoto };
