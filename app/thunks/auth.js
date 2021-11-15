import { SET_TOKENS } from '../constants';
import { AuthAPI } from '../services';

const api = new AuthAPI();

export const getMe = tokens => {
  return async dispatch => {
    try {
      const response = await api.getMe();
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: SET_TOKENS,
          value: {
            tokens,
            user: data,
            isLoggedIn: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
