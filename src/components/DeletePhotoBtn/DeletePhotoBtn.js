import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase/config';

export const DeletePhotoBtn = ({ avatarDeleteHandler }) => {
  const onDeletePhoto = async () => {
    console.log('Нажали на удалить фото ', Date.now());

    const result = await deletePhotoFromFirestore();

    avatarDeleteHandler(result);
  };

  const deletePhotoFromFirestore = async () => {
    try {
      const avatarRef = ref(storage, 'avatarImages/desert.jpg');

      await deleteObject(avatarRef);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={onDeletePhoto}>
        <View style={styles.btnWrapper}>
          <AntDesign name="close" size={16} color="#BDBDBD" />
        </View>
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
  btnWrapper: {
    width: 25,
    height: 25,

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 50,
    backgroundColor: '#fff',
  },
});
