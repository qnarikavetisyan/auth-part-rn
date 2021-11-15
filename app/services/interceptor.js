import fetchIntercept from 'fetch-intercept';
import AsyncStorage from '@react-native-community/async-storage';

import { getToken, setTokens } from '../utils';
import { SET_TOKENS, SIGN_OUT } from '../constants';
import { Store } from '../store';
import URL from './base';

let _request = null;

const loginRefreshToken = async refreshToken => {
  try {
    let data = await fetch(URL + '/api/user/login/' + refreshToken, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const unregister = fetchIntercept.register({
  request: async function (url, config) {
    _request =
      url.includes('login/') || url.includes('symbolicate')
        ? _request
        : [url, config];

    await getToken().then(tokens => {
      if (tokens && tokens.access_token && !url.includes('login/')) {
        return (config.headers.authorization = 'Bearer ' + tokens.access_token);
      }
    });
    return [url, config];
  },

  requestError: function (error) {
    // Called when an error occured during another 'request' interceptor call
    return Promise.reject(error);
  },

  response: async function (response) {
    if (response.status === 401) {
      console.log('error 401');
      return await getToken().then(async tokens => {
        if (tokens.refresh_token) {
          try {
            const response = await loginRefreshToken(tokens.refresh_token);
            const newTokens = await response.json();
            if (response.ok) {
              await setTokens({
                accessToken: newTokens.accessToken,
                refreshToken: newTokens.refreshToken,
              });
              Store.dispatch({
                type: SET_TOKENS,
                value: {
                  tokens: {
                    access_token: newTokens.accessToken,
                    refresh_token: newTokens.refreshToken,
                  },
                },
              });
              _request[1].headers.authorization = `bearer ${newTokens.accessToken}`;
              return fetch(_request[0], _request[1]);
            } else {
              AsyncStorage.multiRemove([
                'access_token',
                'refresh_token',
                'user',
              ]);
              Store.dispatch({
                type: SIGN_OUT,
              });
              return;
            }
          } catch (err_1) {
            return console.log('err_1', err_1);
          }
        }
      });
    }
    return response;
  },

  responseError: function (error) {
    // Handle an fetch error
    return Promise.reject(error);
  },
});

// Unregister your interceptor
// unregister();
