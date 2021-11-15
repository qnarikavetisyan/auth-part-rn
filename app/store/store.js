import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { authReducer, appReducer } from '../reducers';

const rootReducer = combineReducers({
  authReducer,
  appReducer,
});

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));

  return store;
};

export const Store = configureStore();
