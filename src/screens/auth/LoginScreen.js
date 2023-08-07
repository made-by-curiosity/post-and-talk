import { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import backgroundImage from '../../assets/images/background.png';
// import { authSignInUser } from '../../redux/auth/authOperations';

const initialState = {
  email: null,
  password: null,
};

export default function LoginScreen() {
  const [state, setState] = useState(initialState);
  const [focusedInput, setFocusedInput] = useState(null);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const { height, width } = useWindowDimensions();

  // const dispatch = useDispatch();

  // const navigation = useNavigation();

  const handleInputFocus = input => {
    setFocusedInput(input);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const handleHidePassword = () => {
    setIsHidePassword(!isHidePassword);
  };

  // const handleSubmit = () => {
  //   const { email, password } = state;

  //   if (email && password) {
  //     dispatch(authSignInUser(state));
  //     setState(initialState);
  //   }
  // };

  return (
    <ImageBackground
      source={require('../../assets/img/main-bg.jpg')}
      style={{ position: 'absolute', width: width, height: height }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -230 : -370}
        >
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Увійти</Text>
            <View style={styles.inputThumb}>
              <TextInput
                style={[styles.formInput, focusedInput === 'email' && styles.focusedFormInput]}
                placeholder="Адреса електронної пошти"
                textContentType="emailAddress"
                keyboardType="email-address"
                value={state.email}
                onChangeText={value => setState(prev => ({ ...prev, email: value }))}
                onFocus={() => handleInputFocus('email')}
                onBlur={handleInputBlur}
              />

              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.formInput, focusedInput === 'password' && styles.focusedFormInput]}
                  placeholder="Пароль"
                  textContentType="password"
                  secureTextEntry={isHidePassword}
                  value={state.password}
                  onChangeText={value => setState(prev => ({ ...prev, password: value }))}
                  onFocus={() => handleInputFocus('password')}
                  onBlur={handleInputBlur}
                />
                <TouchableOpacity style={styles.passwordButton} onPress={handleHidePassword}>
                  <Text style={styles.passwordButtonText}>
                    {isHidePassword ? 'Показати' : 'Приховати'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              // onPress={handleSubmit}
            >
              <Text style={styles.buttonTitle}>Увійти</Text>
            </TouchableOpacity>
            <TouchableOpacity
            // onPress={() => navigation.navigate('RegistrationScreen')}
            >
              <Text style={styles.textLogin}>
                Немає акаунту? <Text style={styles.registrationText}>Зареєструватися</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  formContainer: {
    paddingTop: 32,
    paddingBottom: 144,
    paddingHorizontal: 16,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: '#FFFFFF',
  },

  formTitle: {
    marginBottom: 32,
    fontSize: 30,
    fontFamily: 'Roboto-Medium',
    lineHeight: 35,
    textAlign: 'center',
  },

  inputThumb: {
    marginBottom: 32,
    gap: 16,
  },

  formInput: {
    padding: 15,
    height: 50,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    lineHeight: 19,
    backgroundColor: '#F6F6F6',
  },

  focusedFormInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF',
  },

  passwordContainer: {
    position: 'relative',
  },

  passwordButton: {
    position: 'absolute',
    top: 15,
    right: 12,
  },

  passwordButtonText: {
    fontSize: 16,
    color: '#1B4371',
  },

  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 16,
    borderRadius: 100,
    backgroundColor: '#FF6C00',
  },

  buttonTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    lineHeight: 19,
    color: '#FFFFFF',
  },

  textLogin: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    lineHeight: 19,
    color: '#1B4371',
  },

  registrationText: {
    textDecorationLine: 'underline',
  },
});

// import { useEffect, useReducer, useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   KeyboardAvoidingView,
//   Keyboard,
//   TouchableWithoutFeedback,
// } from 'react-native';

// const initialFormState = {
//   login: '',
//   email: '',
//   password: '',
// };

// const actions = {
//   CHANGE_LOGIN: 'changeLogin',
//   CHANGE_EMAIL: 'changeEmail',
//   CHANGE_PASSWORD: 'changePassword',
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case actions.CHANGE_EMAIL:
//       return {
//         ...state,
//         email: action.payload.email,
//       };
//     case actions.CHANGE_PASSWORD:
//       return {
//         ...state,
//         password: action.payload.password,
//       };
//     default:
//       return state;
//   }
// }

// export default function LoginScreen() {
//   const [isKeyboardActive, setIsKeyboardActive] = useState(false);
//   const [state, dispatch] = useReducer(reducer, initialFormState);

//   useEffect(() => {
//     console.log('isKeyboardActive', isKeyboardActive);
//     console.log('state', state);
//   }, [isKeyboardActive, state]);

//   useEffect(() => {
//     setIsKeyboardActive(false);
//   }, [isKeyboardActive]);

//   const hideKeyboard = () => {
//     Keyboard.dismiss();
//     setIsKeyboardActive(false);
//   };

//   return (
//     <TouchableWithoutFeedback onPress={hideKeyboard}>
//       <View style={styles.container}>
//         <ImageBackground style={styles.bgcImg} source={require('../../src/img/main-bg.jpg')}>
//           <View style={styles.header}>
//             <Text style={styles.headerTitle}>Увійти</Text>
//           </View>
//           <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//             <View
//               style={{
//                 ...styles.form,
//                 paddingBottom: isKeyboardActive ? 20 : 200,
//               }}
//             >
//               <View style={{ marginTop: 20 }}>
//                 <TextInput
//                   style={styles.textInput}
//                   onFocus={() => setIsKeyboardActive(true)}
//                   onChangeText={value =>
//                     dispatch({
//                       type: actions.CHANGE_EMAIL,
//                       payload: { email: value },
//                     })
//                   }
//                   value={state.email}
//                   placeholder="Адреса електронної пошти"
//                 />
//               </View>
//               <View style={{ marginTop: 20 }}>
//                 <TextInput
//                   style={styles.textInput}
//                   secureTextEntry
//                   onFocus={() => setIsKeyboardActive(true)}
//                   onChangeText={value =>
//                     dispatch({
//                       type: actions.CHANGE_PASSWORD,
//                       payload: { password: value },
//                     })
//                   }
//                   value={state.password}
//                   placeholder="Пароль"
//                 />
//               </View>
//               <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={hideKeyboard}>
//                 <Text style={styles.btnTitle}>Увійти</Text>
//               </TouchableOpacity>
//             </View>
//           </KeyboardAvoidingView>
//         </ImageBackground>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   bgcImg: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'flex-end',
//   },
//   form: {
//     marginHorizontal: 40,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 150,
//   },
//   headerTitle: {
//     fontFamily: 'Roboto-Bold',
//     fontSize: 30,
//     color: '#f0f8ff',
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: '#f0f8ff',
//     height: 40,
//     borderRadius: 6,
//     color: '#f0f8ff',
//     textAlign: 'center',
//   },
//   inputTitle: {
//     color: '#f0f8ff',
//     marginBottom: 10,
//     fontSize: 18,
//   },
//   button: {
//     borderRadius: 6,
//     borderWidth: 1,
//     height: 40,
//     marginTop: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 20,
//     ...Platform.select({
//       ios: {
//         backgroundColor: 'transparent',
//         borderColor: '#f0f8ff',
//       },
//       android: {
//         backgroundColor: '#4169e1',
//         borderColor: 'transparent',
//       },
//     }),
//   },
//   btnTitle: {
//     fontSize: 18,
//     ...Platform.select({
//       ios: {
//         color: '#4169e1',
//       },
//       android: {
//         color: '#f0f8ff',
//       },
//     }),
//   },
// });
