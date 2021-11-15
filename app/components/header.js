import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';

import { AppColors } from '../constants';

import ArrowIcon from '../assets/images/svg/arrow-right.svg';

const { width } = Dimensions.get('window');

export const Header = ({ navigation, title }) => {

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}
        activeOpacity={0.8}>
        <ArrowIcon
          width={30}
          height={30}
          style={{ transform: [{ rotate: '180deg' }] }}
        />
      </TouchableOpacity>
      <Text style={{ ...styles.text, color: AppColors[mode].text }}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    zIndex: 3,
    alignSelf: 'flex-start',
    position: 'absolute',
    left: 0,
    top: -10,
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBack: {
    width: 24,
    height: 14,
    transform: [{ rotate: '-90deg' }],
  },
  header: {
    width: width,
    position: 'absolute',
    top: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
  },
});
