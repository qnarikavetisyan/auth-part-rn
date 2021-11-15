import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

import { CustomLinearGradinet } from './customLinearGradient';

import ArrowIcon from '../assets/images/svg/arrow-right.svg';
import ArrowWhiteIcon from '../assets/images/svg/arrow-white.svg';

const { width } = Dimensions.get('screen');

export const Button = ({
  onPress,
  disabled,
  containerStyle,
  title,
  opt,
  icon,
}) => {

  return (
    <CustomLinearGradinet style={{ borderRadius: 10, ...containerStyle }}>
      <View style={[styles.circleGradient]}>
        <TouchableOpacity
          onPress={() => {
            onPress();
          }}
          disabled={disabled}
          activeOpacity={0.8}
          style={{ backgroundColor: '#111822' }}>
          <Text style={styles.title}>{title, opt}</Text>
          {icon ? (
              <ArrowIcon width={12} height={20} style={styles.image} />
            ) 
           : null}
        </TouchableOpacity>
      </View>
    </CustomLinearGradinet>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: width * 0.7,
    borderRadius: 9,
  },
  circleGradient: {
    borderRadius: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    color: '#ffffff',
  },
  image: {
    position: 'absolute',
    right: 18,
  },
});
