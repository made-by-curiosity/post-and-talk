import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../hooks/userContext';
import { AddPhotoBtn } from '../../components/AddPhotoBtn/AddPhotoBtn';
import { LogoutBtn } from '../../components/LogoutBtn/LogoutBtn';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { logIn } = useUser();

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bgcImg} source={require('../../assets/img/main-bg.jpg')}>
        <View style={styles.authWrapper}>
          <View style={styles.logout}>
            <LogoutBtn />
          </View>
          <View style={styles.photoBox}>
            <AddPhotoBtn />
          </View>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Natali Romanova</Text>
          </View>
          <View
            style={{
              ...styles.form,
            }}
          ></View>
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
    minHeight: 550,
    paddingTop: 60,
    paddingBottom: 45,
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
});
