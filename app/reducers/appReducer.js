import { APP_STATUS, APP_MODE } from '../constants';

const defaultState = {
  isDemo: false,
  mode: 'D',
};

export const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case APP_STATUS:
      return { ...state, isDemo: action.value };
    case APP_MODE:
      return { ...state, mode: action.value };
    default:
      return state;
  }
};
