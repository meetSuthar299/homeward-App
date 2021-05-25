import Geocode from 'react-geocode';

const getRegionFromLocation = async location => {
  let latitude = undefined;
  let longitude = undefined;

  try {
    Geocode.setApiKey('AIzaSyBFMhipgj8TlR-Ia83dCacWBPl03AgFKFI');
    Geocode.setLanguage('en');

    const response = await Geocode.fromAddress(location);

    latitude = response?.results[0]?.geometry?.location?.lat ?? 51.049999;
    longitude = response?.results[0]?.geometry?.location?.lng ?? -114.066666;
  } catch (e) {
    console.error(e);
  }

  return { latitude, longitude, latitudeDelta: 0, longitudeDelta: 0 };
};

export { getRegionFromLocation };
