import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

export const Post = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.post}>
      <Image source={{ uri: item.path }} style={styles.photo} />
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Comments', { postId: item.id, photoUrl: item.path })}
        >
          <View style={styles.commentsContainer}>
            <View style={styles.iconWrapper}>
              <Feather name="message-circle" size={24} color="#BDBDBD" />
            </View>
            <Text style={styles.commentsCount}>0</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Map', item)}>
          <View style={styles.locationContainer}>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
            <Text style={styles.location}>{item.location}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: { marginBottom: 32 },
  photo: { height: 240, marginBottom: 8, borderRadius: 8 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
  location: {
    textDecorationLine: 'underline',
    fontSize: 16,
    color: '#212121',
  },
  nameContainer: {
    marginBottom: 8,
  },
  name: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#212121',
  },
  commentsCount: {
    fontSize: 16,
    color: '#BDBDBD',
  },
  commentsContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  iconWrapper: {
    transform: [{ scaleX: -1 }, { scaleY: 1 }],
  },
});
