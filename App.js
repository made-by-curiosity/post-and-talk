import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AppContent } from './src/components/AppContent';

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}
