import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';

import { MainNavigator } from './routes';
import { Store } from './store';


export default MyApp = () => {
  return (
    <View style={{flex: 1}}>
      <Provider store={Store}>
        <MainNavigator />
      </Provider>
    </View>
  );
};
