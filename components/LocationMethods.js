import * as Location from 'expo-location';

export const getCurrentLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }

    let location = await Location.getCurrentPositionAsync({});
    return location;
  } catch (error) {
    console.log('Error getting location', error);
    return null;
  }
};
s