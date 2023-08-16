import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import girlAvatar from '../../assets/img/girl-avatar.jpg';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../hooks/userContext';
import { Post } from '../../components/Post/Post';

export default function PostsScreen() {
  const { photoList } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <Image source={girlAvatar} style={styles.avatarImg} />
        <View>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={photoList}
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
