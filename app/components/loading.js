import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarIndicator } from 'react-native-indicators';

export const Loading = ({ visible, style }) => {
  return visible ? (
    <View style={[styles.content, style]}>
      <BarIndicator count={7} color={'#0fb6fa'} />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  content: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
