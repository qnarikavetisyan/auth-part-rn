import AsyncStorage from '@react-native-community/async-storage';

export const getToken = async () => {
  try {
    let access_token = await AsyncStorage.getItem('access_token');
    let refresh_token = await AsyncStorage.getItem('refresh_token');
    return { access_token, refresh_token };
  } catch (error) {
    console.log(error);
  }
};

export const setTokens = async data => {
  try {
    await AsyncStorage.setItem('access_token', data.accessToken);
    await AsyncStorage.setItem('refresh_token', data.refreshToken);
  } catch (error) {
    console.log(error);
  }
};

export const saveAppMode = async mode => {
  try {
    await AsyncStorage.setItem('mode', mode);
  } catch (error) {
    console.log(error);
  }
};

export const getAppMode = async () => {
  try {
    const mode = await AsyncStorage.getItem('mode');
    return mode;
  } catch (error) {
    console.log(error);
  }
};
