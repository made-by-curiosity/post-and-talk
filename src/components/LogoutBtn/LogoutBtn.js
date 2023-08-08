import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const LogoutBtn = () => {
  const onLogout = () => {
    console.log('Нажали на выход ', Date.now());
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
