import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { AuthAPI } from '../../services';
import { Loading, Header, Input, Button } from '../../components';
import { SET_TOKENS } from '../../constants';
import { setTokens } from '../../utils';
import { getMe } from '../../thunks';

export const Login = ({ navigation }) => {
  const api = new AuthAPI();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, []);

  const handleSubmit = async user => {
    setError('');
    setLoading(true);
    try {
      const response = await api.login({ ...user, login: `374` + user.phone });
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setTokens(data).then(() => {
          const { user, ...tokens } = data;
          dispatch(getMe(tokens));
          dispatch({
            type: SET_TOKENS,
            value: { tokens, user, isLogedIn: true },
          });
        });
      } else if (response.status === 400) {
        data.login ? setError(data.login) : setError(data.non_field_errors[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log('login');
      setLoading(false);
    }
  };

  const schema = Yup.object().shape({
    phone: Yup.string()
      .required('')
      .matches(
        /^(33|41|43|44|49|55|66|77|88|91|93|94|95|96|98|99)\d{6}$/g,
        'Invalid phone number',
      ),
    password: Yup.string().required(''),
  });

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior="padding"
        enabled={Platform.OS === 'ios'}>
        <Header navigation={navigation} />
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}
        <Input
          label="phone"
          style={{ marginTop: 60 }}
          isPhone={true}
          iconStyleIndex={2}
          touched={formik.touched.phone}
          error={formik.errors.phone}
          onChangeText={formik.handleChange('phone')}
          onBlur={formik.handleBlur('phone')}
          value={formik.values.phone}
        />
        <Input
          label="password"
          style={{ marginTop: 20 }}
          secureTextEntry={true}
          iconStyleIndex={3}
          touched={formik.touched.password}
          error={formik.errors.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          value={formik.values.password}
        />
        <Button
          containerStyle={{ marginTop: 20 }}
          icon
          onPress={formik.handleSubmit}
          title="Login"
        />
        <Loading visible={loading} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#070b10',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 21,
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: '#ffffff',
  },
  error: {
    color: 'red',
    fontSize: 14,
    textAlign: 'left',
  },
});
