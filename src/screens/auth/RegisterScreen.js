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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthInput } from '../../components/AuthInput/AuthInput';
import { AddPhotoBtn } from '../../components/AddPhotoBtn/AddPhotoBtn';

const schema = yup
  .object({
    login: yup.string().required('Login is required!'),
    email: yup.string().email('Wrong email format').required('Email is required!'),
    password: yup.string().required('Password is required!'),
  })
  .required();

const initialFormState = {
  login: '',
  email: '',
  password: '',
};

export default function RegisterScreen() {
  const { control, reset, handleSubmit } = useForm({
    defaultValues: initialFormState,
    resolver: yupResolver(schema),
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onShowPassword = () => {
    setIsPasswordVisible(state => !state);
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSignUp = data => {
    hideKeyboard();
    console.log(data);
    reset(initialFormState);
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -200 : -200}
      >
        <ImageBackground style={styles.bgcImg} source={require('../../assets/img/main-bg.jpg')}>
          <View style={styles.authWrapper}>
            <View style={styles.photoBox}>
              <AddPhotoBtn />
            </View>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Реєстрація</Text>
            </View>
            <View
              style={{
                ...styles.form,
              }}
            >
              <View style={styles.inputsContainer}>
                <AuthInput control={control} fieldName="login" placeholder="Логін" />
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
                onPress={handleSubmit(onSignUp)}
              >
                <Text style={styles.btnTitle}>Зареєстуватися</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => console.log('Нажали на кнопку Войти ', Date.now())}
            >
              <Text style={styles.logInText}>Вже є акаунт? Увійти</Text>
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
    minHeight: 550,
    paddingTop: 60,
    paddingBottom: 45,
    position: 'relative',

    backgroundColor: 'white',

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  photoBox: {
    width: 120,
    height: 120,

    position: 'absolute',
    top: 0,
    left: '50%',

    transform: 'translate(-60px, -60px)',

    backgroundColor: '#F6F6F6',

    borderRadius: 16,
  },
  form: {
    marginHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: 32,
  },
  headerTitle: {
    fontFamily: 'Roboto-Bold',
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
});
