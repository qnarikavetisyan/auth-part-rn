import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { Login, Registration } from '../views/auth';



const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
      }}
      headerMode="none"
      initialRouteName="login"
      mode="card">
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="registration" component={Registration} />
    </Stack.Navigator>
  );
};
