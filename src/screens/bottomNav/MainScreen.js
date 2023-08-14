import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import PostsScreen from './PostsScreen';
import ProfileScreen from './ProfileScreen';
import { LogoutBtn } from '../../components/LogoutBtn/LogoutBtn';

const Tab = createBottomTabNavigator();

const EmptyScreen = () => null;

export default function MainScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#212121',
        tabBarInactiveTintColor: '#212121',
        tabBarStyle: {
          alignItems: 'center',
          height: 83,
          paddingTop: 9,
          paddingBottom: 22,
        },
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
          tabBarIcon: ({ focused, color, size }) => {
            return <Feather name="grid" size={24} color={color} />;
          },
          tabBarItemStyle: {
            marginHorizontal: 15,
            maxWidth: 40,
            height: 40,
            alignSelf: 'center',
          },
        }}
      />
      <Tab.Screen
        name="CreateContainer"
        component={EmptyScreen}
        options={{
          title: 'Створити публікацію',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            lineHeight: 22,
            fontSize: 17,
            letterSpacing: -0.4,
            fontFamily: 'Roboto-Medium',
          },
          tabBarIcon: ({ focused, color, size }) => {
            return <Feather name="plus" size={24} color="#fff" />;
          },
          tabBarIconStyle: {
            maxWidth: 70,
            height: 40,
          },
          tabBarItemStyle: {
            marginHorizontal: 15,
            height: 40,
            alignSelf: 'center',
            maxWidth: 70,
            borderRadius: 50,
            backgroundColor: '#FF6C00',
          },
        }}
        listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate('CreatePost');
          },
        })}
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
          tabBarIcon: ({ focused, color, size }) => {
            return <Feather name="user" size={24} color={color} />;
          },
          tabBarItemStyle: {
            marginHorizontal: 15,
            maxWidth: 40,
            height: 40,
            alignSelf: 'center',
          },
        }}
      />
    </Tab.Navigator>
  );
}
