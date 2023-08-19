import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Navigation } from '../Navigation';
import { authStateChangeUser } from '../redux/auth/operations';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

export const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      dispatch(authStateChangeUser(user));
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Navigation />
    </View>
  );
};
