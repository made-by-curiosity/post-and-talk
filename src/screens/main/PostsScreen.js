import { View, Text, StyleSheet, Image } from 'react-native';
import girlAvatar from '../../assets/img/girl-avatar.jpg';

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <Image source={girlAvatar} style={styles.avatarImg} />
        <View>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
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
