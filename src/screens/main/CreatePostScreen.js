import { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function CreatePostsScreen() {
  const [photoName, setPhotoName] = useState('');
  const [photoLocation, setPhotoLocation] = useState('');
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState('');
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      await requestPermission();
      console.log(permission);
    })();
  }, []);

  useEffect(() => {
    console.log('photo', photo);
  }, [photo]);

  const onTakePhoto = async () => {
    console.log('делаем фото ', Date.now());
    const picture = await cameraRef.takePictureAsync();
    setPhoto(picture.uri);
  };

  const onPost = () => {
    if (!isReadyToPost) {
      return;
    }
    console.log('публикуем фото ', Date.now());
  };

  const resetPhoto = () => {
    setPhoto('');
  };

  const onDelete = () => {
    console.log('удаляем фото ', Date.now());
    setPhotoName('');
    setPhotoLocation('');
    setPhoto('');
  };

  const isReadyToPost = !!photoName && !!photoLocation && !!photo;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -270 : -220}
      >
        <View style={styles.photoBox}>
          {!photo ? (
            <Camera style={styles.camera} type={type} ref={setCameraRef} />
          ) : (
            <View style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={{ flex: 1 }} />
            </View>
          )}

          <View style={styles.photoBtnContainer}>
            <TouchableOpacity
              style={[
                styles.photoBtn,
                { backgroundColor: !photo ? '#fff' : 'rgba(255, 255, 255, 0.30)' },
              ]}
              activeOpacity={0.8}
              onPress={!photo ? onTakePhoto : resetPhoto}
            >
              <MaterialIcons name="photo-camera" size={24} color={!photo ? '#BDBDBD' : '#fff'} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.mainText}>{!photo ? 'Завантажте фото' : 'Редагувати фото'}</Text>

        <TextInput
          style={styles.photoName}
          placeholder="Назва..."
          placeholderTextColor="#BDBDBD"
          value={photoName}
          onChangeText={setPhotoName}
        />
        <View style={styles.locationWrapper}>
          <TextInput
            style={styles.photoLocation}
            placeholder="Місцевість..."
            placeholderTextColor="#BDBDBD"
            value={photoLocation}
            onChangeText={setPhotoLocation}
          />
          <Feather name="map-pin" size={24} color="#BDBDBD" style={styles.locationIcon} />
        </View>
        <TouchableOpacity
          style={[styles.postBtn, isReadyToPost && styles.activePostBtn]}
          activeOpacity={0.8}
          onPress={onPost}
        >
          <Text style={[styles.postBtnText, isReadyToPost && styles.activePostText]}>
            Опублікувати
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.8} onPress={onDelete}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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

    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',

    backgroundColor: '#F6F6F6',
    overflow: 'hidden',

    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  photoContainer: {
    flex: 1,
  },
  photoBtnContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    justifyContent: 'center',
    alignItems: 'center',

    flex: 1,
  },
  photoBtn: {
    width: 60,
    height: 60,

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

    color: '#212121',
  },
  photoLocation: {
    height: 50,
    paddingLeft: 28,

    alignItems: 'center',

    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',

    fontFamily: 'Roboto-Regular',
    fontSize: 16,

    color: '#212121',
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
  activePostBtn: {
    backgroundColor: '#FF6C00',
  },
  postBtnText: {
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  activePostText: {
    color: '#fff',
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
