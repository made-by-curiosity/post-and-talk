import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Navigation } from './src/Navigation';
import { UserProvider } from './src/hooks/userContext';

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
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}
