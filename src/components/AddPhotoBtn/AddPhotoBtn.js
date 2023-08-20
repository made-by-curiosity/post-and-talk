import { TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase/config';

export const AddPhotoBtn = ({ avatarHandler }) => {
  const onAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!(status === 'granted')) {
      Alert.alert('Дозвіл не надано', 'Додайте дозвіл для використання фото в налаштуваннях');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      const avatar = await uploadPhotoToServer(result.assets[0].uri);

      avatarHandler(avatar);
    }
  };

  const uploadPhotoToServer = async photo => {
    const blob = await uriToBlob(photo);

    const uniquePostId = Date.now();

    const photoRef = ref(storage, `avatarImages/${uniquePostId}`);

    await uploadBytes(photoRef, blob);

    return await getDownloadURL(photoRef);
  };

  const uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };
      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);

      xhr.send(null);
    });
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
});
