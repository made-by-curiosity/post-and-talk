import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { useNavigation } from '@react-navigation/native';
import { Camera, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../../firebase/config';
import { selectUser, selectUserId } from '../../redux/auth/selectors';

export default function CreatePostsScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [photoLocation, setPhotoLocation] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();
  const { login } = useSelector(selectUser);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    (async () => {
      await requestPermission();
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const onTakePhoto = async () => {
    const picture = await cameraRef.takePictureAsync();
    setPhoto(picture.uri);
  };

  const onPost = async () => {
    if (!isReadyToPost) {
      return;
    }

    const path = await uploadPhotoToServer();

    const photoInfo = {
      path,
      name: photoName,
      location: photoLocation,
      coords: location,
      login,
      userId,
      date: Date.now(),
    };

    await writePostToFirestore(photoInfo);

    navigation.navigate('Posts');
  };

  const writePostToFirestore = async photoInfo => {
    try {
      await addDoc(collection(db, 'posts'), photoInfo);
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e;
    }
  };

  const uploadPhotoToServer = async () => {
    const blob = await uriToBlob(photo);

    const uniquePostId = Date.now();

    const photoRef = ref(storage, `postImages/${uniquePostId}`);

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
            <Camera style={styles.camera} type={type} ref={setCameraRef} ratio="3:4" />
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
