import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export const CustomLinearGradinet = ({ children, style }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={style}
      colors={['#015eea', '#31bdef']}>
      {children}
    </LinearGradient>
  );
};
