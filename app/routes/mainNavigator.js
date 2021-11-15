import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { getAppMode, getToken } from '../utils';
import { Splash } from '../components';
import { SET_TOKENS } from '../constants';
import { getMe, getAppStatus, setAppMode } from '../thunks';

import { AuthStack } from './authStack';

export const MainNavigator = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    handleGetToken();
    handleGetAppMode();
    dispatch(getAppStatus());
  }, []);

  const handleGetToken = async () => {
    try {
      const data = await getToken();
      if (data.access_token) {
        dispatch(getMe(data));
      } else {
        dispatch({
          type: SET_TOKENS,
          value: { tokens: null, user: null, isLoggedIn: false },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAppMode = async () => {
    try {
      const mode = await getAppMode();
      if (mode) {
        dispatch(setAppMode(mode));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};
