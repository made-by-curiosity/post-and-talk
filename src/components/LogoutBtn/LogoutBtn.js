import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useUser } from '../../hooks/userContext';

export const LogoutBtn = () => {
  const { logOut } = useUser();

  const onLogout = () => {
    console.log('Нажали на выход ', Date.now());
    logOut();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={onLogout}>
        <Feather name="log-out" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },
});
