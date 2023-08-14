import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function CreatePostsScreen() {
  const onTakePhoto = () => {
    console.log('делаем фото ', Date.now());
  };

  const onPost = () => {
    console.log('публикуем фото ', Date.now());
  };

  const onDelete = () => {
    console.log('удаляем фото ', Date.now());
  };

  return (
    <View style={styles.container}>
      <View style={styles.photoBox}>
        <TouchableOpacity style={styles.photoBtn} activeOpacity={0.8} onPress={onTakePhoto}>
          <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <Text style={styles.mainText}>Завантажте фото</Text>
      <TextInput
        style={styles.photoName}
        placeholder="Назва..."
        placeholderTextColor="#BDBDBD"
      ></TextInput>
      <View style={styles.locationWrapper}>
        <TextInput
          style={styles.photoLocation}
          placeholder="Місцевість..."
          placeholderTextColor="#BDBDBD"
        ></TextInput>
        <Feather name="map-pin" size={24} color="#BDBDBD" style={styles.locationIcon} />
      </View>
      <TouchableOpacity style={styles.postBtn} activeOpacity={0.8} onPress={onPost}>
        <Text style={styles.postBtnText}>Опублікувати</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.8} onPress={onDelete}>
        <Feather name="trash-2" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 22,
    paddingHorizontal: 16,

    backgroundColor: '#fff',
  },
  photoBox: {
    height: 240,
    marginBottom: 8,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',

    backgroundColor: '#F6F6F6',
  },
  photoBtn: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  mainText: {
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    marginBottom: 32,
  },
  photoName: {
    height: 50,
    marginBottom: 16,

    alignItems: 'center',

    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  photoLocation: {
    height: 50,
    paddingLeft: 28,

    alignItems: 'center',

    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  locationWrapper: {
    position: 'relative',
    marginBottom: 32,
  },
  locationIcon: {
    position: 'absolute',
    top: 12,
    left: 0,
  },
  postBtn: {
    paddingVertical: 16,

    backgroundColor: '#F6F6F6',

    borderRadius: 100,

    alignItems: 'center',
  },
  postBtnText: {
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  deleteBtn: {
    width: 70,
    height: 40,
    marginTop: 'auto',

    borderRadius: 20,
    backgroundColor: '#F6F6F6',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
