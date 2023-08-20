import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  collection,
  setDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  collectionGroup,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { selectUserId, selectUser } from '../../redux/auth/selectors';
import { Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import defaultAvatar from '../../assets/img/default-avatar.png';

export const CommentsScreen = ({ route }) => {
  const [allComments, setAllComments] = useState([]);
  const { postId, photoUrl } = route.params;
  const [comment, setComment] = useState('');
  const currentUserId = useSelector(selectUserId);
  const { login, avatar } = useSelector(selectUser);

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
        avatar,
      };

      const commentsRef = doc(collection(db, `posts/${postId}/comments`));

      await setDoc(commentsRef, userComment);

      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToBottom = () => {
    if (commentsListRef.current && !!allComments.length) {
      commentsListRef.current.scrollToEnd({ animated: false });
    }
  };

  const commentsListRef = useRef(null);

  const handleContentSizeChange = () => {
    scrollToBottom();
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
        {!allComments.length ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Нема коментарів</Text>
          </View>
        ) : (
          <FlatList
            ref={commentsListRef}
            onContentSizeChange={handleContentSizeChange}
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
              const sentTime = date.toLocaleString('uk-UA', options).replace('р.,', '|');

              const isCurrentUsersComment = item.userId === currentUserId;

              return (
                <View
                  style={[
                    styles.commentWrapper,
                    {
                      flexDirection: isCurrentUsersComment ? 'row-reverse' : 'row',
                      gap: 16,
                    },
                  ]}
                >
                  <View>
                    <Image
                      source={item.avatar ? { uri: item.avatar } : defaultAvatar}
                      style={styles.avatar}
                    />
                  </View>
                  <View
                    style={[
                      styles.comment,
                      {
                        borderTopRightRadius: isCurrentUsersComment ? 0 : 6,
                        borderTopLeftRadius: isCurrentUsersComment ? 6 : 0,
                      },
                    ]}
                  >
                    <Text style={styles.useName}>{item.login}</Text>
                    <Text style={styles.message}>{item.comment}</Text>
                    <Text
                      style={[
                        styles.messageTime,
                        {
                          alignSelf: isCurrentUsersComment ? 'flex-start' : 'flex-end',
                        },
                      ]}
                    >
                      {sentTime}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        )}
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
    flexGrow: 1,
  },
  commentWrapper: {
    flexDirection: 'row',
  },
  comment: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    marginBottom: 24,
    padding: 16,
    flex: 1,

    borderRadius: 6,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  useName: {
    fontSize: 10,

    fontWeight: '900',
    marginBottom: 5,
  },
  message: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Roboto-Regular',
    color: '#212121',
    marginBottom: 8,
  },
  messageTime: {
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    color: '#BDBDBD',
  },
  inputContainer: {
    marginTop: 7,
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
