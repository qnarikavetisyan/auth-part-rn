import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import UserIcon from '../assets/images/svg/user.svg';
import EmailIcon from '../assets/images/svg/email.svg';
import LockIcon from '../assets/images/svg/lock.svg';
import EyeIcon from '../assets/images/svg/eye.svg';
import TelephoneIcon from '../assets/images/svg/telephone.svg';

const { width } = Dimensions.get('screen');

export class InputClass extends Component {
  state = {
    isFocused: false,
    top: new Animated.Value(14),
    fontSize: new Animated.Value(12),
  };

  iconSource = [
    <UserIcon style={styles.image} width={17} height={22} />,
    <EmailIcon style={styles.image} width={20} height={16} />,
    <TelephoneIcon style={styles.image} width={19} height={19} />,
    <LockIcon style={styles.image} width={16} height={21} />,
    <EyeIcon style={styles.image} width={16} height={21} />,
  ];

  handleFocus = e => {
    this.setState({ isFocused: true });
    Animated.parallel([
      Animated.timing(this.state.top, {
        toValue: -7,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.fontSize, {
        toValue: 9,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };

  handleBlur = e => {
    this.setState({ isFocused: false });
    this.props.onBlur(e);
    Animated.parallel([
      Animated.timing(this.state.top, {
        toValue: 14,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.fontSize, {
        toValue: 12,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };

  formatValue = value => {
    const { secureTextEntry } = this.props;
    if (value.length > 15 && !secureTextEntry) {
      let xStr = value.substring(0, 14);
      return xStr + '...';
    }
    return value;
  };

  render() {
    const {
      style,
      placeholder,
      icon,
      iconBlue,
      onBlur,
      isMaskedInput,
      isPhone,
      customError,
      ...props
    } = this.props;

    const { isFocused, top, fontSize } = this.state;

    let newVal = isFocused ? props.value : this.formatValue(props.value);
    const labelStyle =
      props.value.length > 0
        ? {
            left: 13,
            top: -7,
            fontSize: 9,
          }
        : {
            left: !isFocused ? (isPhone ? 59 : 23) : 13,
            top: top,
            fontSize: fontSize,
          };

    return (
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{ borderRadius: 10, ...style, marginBottom: 20 }}
        colors={['#015eea', '#31bdef']}>
        <View style={styles.circleGradient}>
          <View style={[styles.container]}>
            <View style={{ zIndex: 1 }}>
              <Animated.Text style={[{ position: 'absolute' }, labelStyle]}>
                <Animated.Text
                  style={[
                    styles.labelStyle,
                    labelStyle,
                  ]}>
                  {props.label}
                </Animated.Text>
              </Animated.Text>
            </View>
            {isPhone ? (
              <View style={styles.countryContainer}>
                <Text
                  style={[styles.countryCode]}>
                  +374{' '}
                </Text>
                <View
                  style={[
                    styles.line,
                  ]}
                />
              </View>
            ) : null}
            <TextInput
              {...props}
              style={[
                styles.input,
                {
                  paddingLeft: isPhone ? 60 : 15,
                },
              ]}
              value={newVal}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              blurOnSubmit
              underlineColorAndroid="transparent"
            />
            {this.iconSource[props.iconStyleIndex]}
            {props.error && props.touched ? (
              <Text style={styles.error}>{props.error}</Text>
            ) : (
              <Text style={styles.error}>
                {customError ? customError : ''}
              </Text>
            )}
          </View>
        </View>
      </LinearGradient>
    );
  }
}

export const Input = connect()(InputClass);

const styles = StyleSheet.create({
  container: {
    width: width * 0.7,
  },
  circleGradient: {
    margin: 1.4,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  input: {
    backgroundColor: '#070b10',
    paddingLeft: 15,
    paddingRight: 33,
    borderRadius: 10,
    width: '100%',
    height: 45,
    fontSize: 20,
    color: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 3,
    marginLeft: 25,
    marginBottom: 5,
  },
  labelStyle: {
    color: '#fff',
    position: 'absolute',
    right: 0,
    backgroundColor: '#070b10',
  },
  countryContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 2,
    position: 'absolute',
    zIndex: 100,
    left: 0,
    top: 2,
  },
  countryCode: {
    color: 'white',
    fontSize: 20,
    marginBottom: 3,
    fontFamily: 'Montserrat-Regular',
  },
  line: {
    height: 44,
    width: 1,
    backgroundColor: 'white',
    bottom: 2,
  },
});
