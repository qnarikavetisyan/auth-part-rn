import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { AuthAPI } from '../../services';
import { Loading, CustomAlert, Header, Input, Button } from '../../components';
import { SET_TOKENS } from '../../constants';
import { setTokens } from '../../utils';
import { getMe } from '../../thunks';

import Logo from '../../assets/images/svg/logo.svg';
import TickIcon from '../../assets/images/svg/tick.svg';

export const Registration = ({ navigation }) => {
  const api = new AuthAPI();
  const dispatch = useDispatch();

  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    password: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    verificationCode: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    setErrors({
      password: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      verificationCode: '',
    });
    setModalVisible(false);
    setUser({});
  }, []);

  const handleSubmit = async verificationCode => {
    setErrors({
      password: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      verificationCode: '',
    });
    setLoading(true);

    try {
      const response = await api.registration({
        ...user,
        phoneNumber: `374` + user.phoneNumber,
        ...verificationCode,
      });

      if (response.ok) {
        login();
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.non_field_errors);
        for (let el in data) {
          setErrors(prevState => {
            return { ...prevState, [el]: data[el] };
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCode = async user => {
    setUser(user);

    try {
      const response = await api.getCode(`374${user.phoneNumber}`);
      const data = await response.json();
      if (response.ok) {
        setModalVisible(true);
      } else if (data.phoneNumber) {
        setErrors(prev => {
          return {
            ...prev,
            phoneNumber: data.phoneNumber,
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const response = await api.login({
        login: `374${user.phoneNumber}`,
        password: user.password,
      });
      const data = await response.json();
      if (response.ok) {
        setTokens(data).then(() => {
          const { user, ...tokens } = data;
          dispatch({
            type: SET_TOKENS,
            value: { tokens, user, isLoggedIn: true },
          });
          dispatch(getMe(tokens));
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const schema = Yup.object().shape({
    firstName: Yup.string()
      .required('')
      .max(64, ''),
    lastName: Yup.string()
      .required('')
      .max(64, ('')),
    phoneNumber: Yup.string()
      .required('')
      .matches(
        /^(33|41|43|44|49|55|66|77|88|91|93|94|95|96|98|99)\d{6}$/g,
        'Invalid Phone Number',
      ),
    password: Yup.string().required(''),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: getCode,
  });

  const verificationSchema = Yup.object().shape({
    verificationCode: Yup.string()
      .required('')
      .max(6)
      .min(6),
  });

  const verificationFormik = useFormik({
    initialValues: {
      verificationCode: '',
    },
    validationSchema: verificationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <ScrollView style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <KeyboardAvoidingView
          style={styles.content}
          behavior="padding"
          enabled={Platform.OS === 'ios'}>
          <Logo width={100} height={120} />
          <Input
            label="auth.name"
            style={{ marginTop: 70 }}
            iconStyleIndex={0}
            touched={formik.touched.firstName}
            error={formik.errors.firstName}
            customError={errors.firstName}
            onChangeText={formik.handleChange('firstName')}
            onBlur={formik.handleBlur('firstName')}
            value={formik.values.firstName}
          />
          <Input
            label="auth.surname"
            iconStyleIndex={0}
            touched={formik.touched.lastName}
            error={formik.errors.lastName}
            customError={errors.lastName}
            onChangeText={formik.handleChange('lastName')}
            onBlur={formik.handleBlur('lastName')}
            value={formik.values.lastName}
          />
          <Input
            label="auth.phone"
            isPhone={true}
            iconStyleIndex={2}
            touched={formik.touched.phoneNumber}
            error={formik.errors.phoneNumber}
            customError={errors.phoneNumber}
            onChangeText={formik.handleChange('phoneNumber')}
            onBlur={formik.handleBlur('phoneNumber')}
            value={formik.values.phoneNumber}
          />
          <Input
            label="auth.password"
            secureTextEntry={true}
            iconStyleIndex={3}
            touched={formik.touched.password}
            error={formik.errors.password}
            customError={errors.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
          />
          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={styles.openTerms}
              onPress={() => {
                navigation.navigate('conditions');
              }}>
              <Text
                style={[
                  styles.termsText,
                  { color:'#fff' },
                ]}>
                Agree Text
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTerms(!terms);
              }}
              style={styles.termsButton}>
              <View
                style={[
                  styles.termsBox,
                  { borderColor: '#fff' },
                ]}>
                {terms ? (
                  mode === 'D' ? (
                    <Image
                      style={styles.termsCheck}
                      source={require('../../assets/images/tick.png')}
                    />
                  ) : (
                    <TickIcon width={18} height={18} />
                  )
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
          <Button
            disabled={!terms}
            containerStyle={{ marginVertical: 20 }}
            icon
            onPress={formik.handleSubmit}
            title="auth.registration"
          />

          <Loading visible={loading} />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <CustomAlert
        modalVisible={modalVisible}
        onPress={verificationFormik.handleSubmit}
        isConfirmModal={true}
        setModalVisible={setModalVisible}>
        <Input
          label="auth.verify_code"
          keyboardType="phone-pad"
          maxLength={6}
          touched={verificationFormik.touched.verificationCode}
          error={
            verificationFormik.errors.verificationCode ||
            errors.verificationCode
          }
          onChangeText={verificationFormik.handleChange('verificationCode')}
          onBlur={verificationFormik.handleBlur('verificationCode')}
          value={verificationFormik.values.verificationCode}
        />
      </CustomAlert>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  logo: {
    height: 102,
    width: 102,
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 21,
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: '#ffffff',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsText: {
    fontSize: 10,
    color: '#fff',
    textDecorationLine: 'underline',
    textDecorationColor: '#fff',
  },
  termsBox: {
    width: 20,
    height: 20,
    borderWidth: 1.3,
    borderRadius: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsButton: {
    padding: 8,
  },
  openTerms: {
    height: 23,
    justifyContent: 'center',
  },
  termsCheck: {
    width: 14.64,
    height: 10.72,
  },
  termsLine: {
    position: 'absolute',
    width: '100%',
    height: 0.3,
    bottom: 3,
    backgroundColor: '#fff',
  },
});
