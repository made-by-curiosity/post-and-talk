import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export const Post = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View style={{ marginBottom: 10 }}>
      <Image source={{ uri: item.path }} style={{ marginHorizontal: 10, height: 200 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Comments')}>
          <Text>Comments</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
          <Text>{item.location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
