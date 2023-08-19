import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';

export const LogoutBtn = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logOut());
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
