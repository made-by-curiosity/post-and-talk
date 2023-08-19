import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import MainScreen from './screens/bottomNav/MainScreen';
import CreatePostsScreen from './screens/main/CreatePostScreen';

import { CommentsScreen } from './screens/main/CommentsScreen';
import { MapScreen } from './screens/main/MapScreen';
import { useSelector } from 'react-redux';
import { selectStateChange } from './redux/auth/selectors';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

export const Navigation = () => {
  const isLoggedIn = useSelector(selectStateChange);

  if (!isLoggedIn) {
    return (
      <NavigationContainer>
        <AuthStack.Navigator initialRouteName="Login">
          <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <AuthStack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Main">
        <MainStack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <MainStack.Screen
          name="CreatePost"
          component={CreatePostsScreen}
          options={{
            title: 'Створити публікацію',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              lineHeight: 22,
              fontSize: 17,
              letterSpacing: -0.4,
              fontFamily: 'Roboto-Medium',
            },
          }}
        />
        <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{
            title: 'Коментарі',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              lineHeight: 22,
              fontSize: 17,
              letterSpacing: -0.4,
              fontFamily: 'Roboto-Medium',
            },
          }}
        />
        <MainStack.Screen
          name="Map"
          component={MapScreen}
          options={{
            title: 'Мапа',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              lineHeight: 22,
              fontSize: 17,
              letterSpacing: -0.4,
              fontFamily: 'Roboto-Medium',
            },
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
