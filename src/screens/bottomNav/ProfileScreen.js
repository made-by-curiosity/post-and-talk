import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList } from 'react-native';
import { AddPhotoBtn } from '../../components/AddPhotoBtn/AddPhotoBtn';
import { LogoutBtn } from '../../components/LogoutBtn/LogoutBtn';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectUserId } from '../../redux/auth/selectors';
import { Post } from '../../components/Post/Post';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Image } from 'react-native';
import { DeletePhotoBtn } from '../../components/DeletePhotoBtn/DeletePhotoBtn';
import { avatarDelete, avatarUpdate } from '../../redux/auth/operations';

export default function ProfileScreen() {
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const [userAvatar, setUserAvatar] = useState(null);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    if (user.avatar) {
      setUserAvatar(user.avatar);
    }
  }, []);

  const getAllPosts = async () => {
    try {
      const dateDesc = query(
        collection(db, 'posts'),
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );

      onSnapshot(dateDesc, data => {
        setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const avatarHandler = photoLink => {
    setUserAvatar(photoLink);
    dispatch(avatarUpdate(photoLink));
  };

  const avatarDeleteHandler = () => {
    dispatch(avatarDelete());
    setUserAvatar(null);
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bgcImg} source={require('../../assets/img/main-bg.jpg')}>
        <View style={styles.authWrapper}>
          <View style={styles.logout}>
            <LogoutBtn />
          </View>
          <View style={styles.photoBox}>
            {userAvatar && <Image source={{ uri: userAvatar }} style={styles.avatar} />}

            {userAvatar ? (
              <DeletePhotoBtn avatarDeleteHandler={avatarDeleteHandler} />
            ) : (
              <AddPhotoBtn avatarHandler={avatarHandler} />
            )}
          </View>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{user.login}</Text>
          </View>
          <View style={styles.postsContainer}>
            <FlatList
              data={posts}
              keyExtractor={post => post.id.toString()}
              renderItem={({ item }) => <Post item={item} />}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgcImg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  authWrapper: {
    height: 600,
    paddingTop: 60,
    paddingBottom: 100,
    position: 'relative',

    backgroundColor: 'white',

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  photoBox: {
    width: 120,
    height: 120,

    position: 'absolute',
    top: 0,
    left: '50%',

    transform: 'translate(-60px, -60px)',

    backgroundColor: '#F6F6F6',

    borderRadius: 16,
  },
  avatar: { flex: 1, borderRadius: 16, resizeMode: 'cover' },

  form: {
    marginHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: 32,
  },
  headerTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    color: '#212121',
    marginBottom: 33,
  },
  logout: {
    position: 'absolute',
    top: 22,
    right: 0,
  },
  postsContainer: {
    marginHorizontal: 16,
  },
});
