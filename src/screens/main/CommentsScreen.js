import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  // FlatList,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { collection, setDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { selectUserId, selectUser } from '../../redux/auth/selectors';
import { Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export const CommentsScreen = ({ route }) => {
  const [allComments, setAllComments] = useState([]);
  const { postId, photoUrl } = route.params;
  const [comment, setComment] = useState('');
  const currentUserId = useSelector(selectUserId);
  const { login } = useSelector(selectUser);

  useEffect(() => {
    if (allComments.length < 1) {
      return;
    }
    console.log(allComments);
  }, [allComments]);

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = async () => {
    const commentsDateAsc = query(collection(db, `posts/${postId}/comments`), orderBy('date'));

    onSnapshot(commentsDateAsc, data => {
      setAllComments(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
  };

  const createComment = async () => {
    try {
      const userComment = {
        userId: currentUserId,
        login,
        comment,
        date: Date.now(),
      };

      const commentsRef = doc(collection(db, `posts/${postId}/comments`));

      await setDoc(commentsRef, userComment);

      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -170 : -170}
      >
        <View style={styles.photoBox}>
          <Image style={styles.photo} source={{ uri: photoUrl }} />
        </View>
        <FlatList
          style={styles.commentsContainer}
          data={allComments}
          keyExtractor={comment => comment.id.toString()}
          renderItem={({ item }) => {
            const date = new Date(item.date);
            const options = {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            };
            const sentTime = date.toLocaleString('uk-UA', options);

            const isCurrentUsersComment = item.userId === currentUserId;

            return (
              <View
                style={[
                  styles.comment,
                  { alignSelf: isCurrentUsersComment ? 'flex-start' : 'flex-end' },
                ]}
              >
                <Text>{item.login}</Text>
                <Text>{item.comment}</Text>
                <Text>{sentTime}</Text>
              </View>
            );
          }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Коментувати..."
            style={styles.commentInput}
            onChangeText={setComment}
            value={comment}
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.sendBtn} onPress={createComment}>
            <AntDesign name="arrowup" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 16,

    backgroundColor: '#fff',
  },
  photoBox: {
    height: 240,
    marginBottom: 32,

    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',

    backgroundColor: '#F6F6F6',
  },
  photo: {
    flex: 1,
    resizeMode: 'cover',
    borderWidth: 1,
    borderRadius: 8,
  },
  commentsContainer: {
    backgroundColor: 'tomato',
  },

  comment: {
    backgroundColor: 'gray',
    marginBottom: 10,
  },
  inputContainer: {
    marginTop: 31,
  },
  sendBtn: {
    width: 34,
    height: 34,

    position: 'absolute',
    top: 8,
    right: 8,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FF6C00',

    borderRadius: 50,
  },
  commentInput: {
    height: 50,
    paddingLeft: 16,

    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 50,

    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#BDBDBD',
  },
});
