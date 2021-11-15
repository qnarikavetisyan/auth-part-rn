import { SET_TOKENS, SET_IMAGE, SIGN_OUT, SET_USER } from '../constants';

const defaultState = {
  user: {},
  isLoading: false,
  isLoggedIn: false,
};

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TOKENS:
      return {
        ...state,
        user: {
          ...state.user,
          tokens: action.value.tokens,
          ...action.value.user,
        },
        isLoading: false,
        isLoggedIn: action.value.isLoggedIn,
      };
    case SET_IMAGE:
      return {
        ...state,
        user: {
          ...state.user,
          image: action.value,
        },
      };
    case SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.value,
        },
      };
    case SIGN_OUT:
      return { ...state, user: {}, isLoading: false, isLoggedIn: false };
    default:
      return state;
  }
};
