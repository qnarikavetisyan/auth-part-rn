import { APP_MODE, APP_STATUS } from '../constants';
import { API } from '../services';
import { saveAppMode } from '../utils';

const api = new API();

export const getAppStatus = () => {
  return async dispatch => {
    try {
      const response = await api.getAppStatus();
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: APP_STATUS,
          value: data.is_demo,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setAppMode = mode => {
  saveAppMode(mode);
  return {
    type: APP_MODE,
    value: mode,
  };
};
