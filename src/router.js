import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import MainScreen from './screens/bottomNav/MainScreen';
import CreatePostsScreen from './screens/main/CreatePostScreen';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

export const useRoute = isLoggedIn => {
  if (!isLoggedIn) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <AuthStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
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
    </MainStack.Navigator>
  );
};
