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

export const CommentsScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -170 : -170}
      >
        <View style={styles.photoBox}></View>
        <View style={styles.commentsContainer}>
          <Text>Comments</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Коментувати..." style={styles.commentInput} />
          <TouchableOpacity activeOpacity={0.8} style={styles.sendBtn}>
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
    marginBottom: 8,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',

    backgroundColor: '#F6F6F6',
  },
  commentsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {},
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
