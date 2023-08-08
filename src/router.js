import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostsScreen from './screens/main/PostsScreen';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import CreatePostsScreen from './screens/main/CreatePostScreen';
import ProfileScreen from './screens/main/ProfileScreen';
import { LogoutBtn } from './components/LogoutBtn/LogoutBtn';

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

export const useRoute = isLoggedIn => {
  if (!isLoggedIn) {
    return (
      <AuthStack.Navigator initialRouteName="Posts">
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
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
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
      <Tab.Screen
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
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Профіль',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            lineHeight: 22,
            fontSize: 17,
            letterSpacing: -0.4,
            fontFamily: 'Roboto-Medium',
          },
        }}
      />
    </Tab.Navigator>
  );
};
