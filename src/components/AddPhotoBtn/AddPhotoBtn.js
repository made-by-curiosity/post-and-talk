import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const AddPhotoBtn = () => {
  const onAddPhoto = () => {
    console.log('Нажали на добавить фото ', Date.now());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={onAddPhoto}>
        <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 12.5,
    right: -12.5,
  },
  btn: {
    cursor: 'pointer',
  },
});
