import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthInput } from '../../components/AuthInput/AuthInput';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';

const schema = yup
  .object({
    email: yup.string().email('Wrong email format').required('Email is required!'),
    password: yup.string().required('Password is required!'),
  })
  .required();

const initialFormState = {
  email: '',
  password: '',
};

export default function RegisterScreen() {
  const { control, reset, handleSubmit } = useForm({
    defaultValues: initialFormState,
    resolver: yupResolver(schema),
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const onShowPassword = () => {
    setIsPasswordVisible(state => !state);
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const onLogIn = data => {
    dispatch(logIn(data));
    reset(initialFormState);
  };

  const goToRegisterPage = () => {
    navigation.navigate('Register');
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -270 : -220}
      >
        <ImageBackground style={styles.bgcImg} source={require('../../assets/img/main-bg.jpg')}>
          <View style={styles.authWrapper}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Увійти</Text>
            </View>
            <View
              style={{
                ...styles.form,
              }}
            >
              <View style={styles.inputsContainer}>
                <AuthInput
                  control={control}
                  fieldName="email"
                  placeholder="Адреса електронної пошти"
                  type="email-address"
                />
                <AuthInput
                  control={control}
                  fieldName="password"
                  placeholder="Пароль"
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  onPress={onShowPassword}
                  activeOpacity={0.8}
                  style={styles.pswdBtn}
                >
                  <Text style={styles.pswdShow}>{isPasswordVisible ? 'Сховати' : 'Показати'}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={handleSubmit(onLogIn)}
              >
                <Text style={styles.btnTitle}>Увійти</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={goToRegisterPage}>
              <Text style={styles.logInText}>
                Немає акаунту? <Text style={styles.registerText}>Зареєструватися</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgcImg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  authWrapper: {
    minHeight: 490,
    paddingTop: 32,
    paddingBottom: 45,
    position: 'relative',

    backgroundColor: 'white',

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  form: {
    marginHorizontal: 16,
  },
  header: {
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    color: '#212121',
    marginBottom: 33,
  },
  inputsContainer: {
    position: 'relative',
    flexDirection: 'column',
    gap: 16,
    marginBottom: 27,
  },
  inputTitle: {
    color: '#f0f8ff',
    marginBottom: 10,
    fontSize: 18,
  },
  pswdBtn: {
    position: 'absolute',
    bottom: 30,
    right: 16,
  },
  pswdShow: {
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  button: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    marginBottom: 16,
  },
  btnTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  logInText: {
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  registerText: {
    textDecorationLine: 'underline',
  },
});
