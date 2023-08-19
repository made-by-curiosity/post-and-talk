import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import girlAvatar from '../../assets/img/girl-avatar.jpg';
import { Post } from '../../components/Post/Post';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function PostsScreen() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const dateDesc = query(collection(db, 'posts'), orderBy('date', 'desc'));

      onSnapshot(dateDesc, data => {
        setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <Image source={girlAvatar} style={styles.avatarImg} />
        <View>
          <Text style={styles.name}>{user.login}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={post => post.id.toString()}
        renderItem={({ item }) => <Post item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  userWrapper: {
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  name: {
    fontSize: 13,
    fontFamily: 'Roboto-Bold',
    color: '#212121',
  },
  email: {
    fontSize: 11,
    fontFamily: 'Roboto-Regular',
    color: 'rgba(33, 33, 33, 0.80)',
  },
});
