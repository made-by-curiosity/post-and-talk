import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import PostsScreen from './src/screens/auth/PostsScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import { LogoutBtn } from './src/components/LogoutBtn/LogoutBtn';

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('./src/assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./src/assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Inter-Medium': require('./src/assets/fonts/Inter/static/Inter-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Posts">
        <MainStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <MainStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            title: 'Публікації',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              lineHeight: 22,
              fontSize: 17,
              letterSpacing: -0.4,
              fontFamily: 'Roboto-Medium',
            },
            headerRight: () => <LogoutBtn />,
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
