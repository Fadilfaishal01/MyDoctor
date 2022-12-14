import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header} from '../../components/molecules';
import Profile from '../../components/molecules/Profile';
import {Button, Gap, Input} from '../../components/atoms';
import {
  colors,
  getData,
  showError,
  showSuccess,
  showWarning,
  storeData,
} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {child, get, getDatabase, ref, update} from 'firebase/database';
import {getAuth, updatePassword} from 'firebase/auth';
import {Database} from '../../config';
import {launchImageLibrary} from 'react-native-image-picker';

export default function UpdateProfile({navigation}) {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullname: '',
    profession: '',
    email: '',
    uid: '',
  });

  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);

  const updateProfile = () => {
    if (password.length > 0 && password.length < 8) {
      return showWarning('Password of at least 8 characters');
    } else if (password.length > 0 && password.length >= 8) {
      updatePasswordUser();
      updateProfileUser();
      navigation.replace('UserProfile');
    }
    updateProfileUser();
    navigation.replace('UserProfile');
  };

  const updatePasswordUser = () => {
    // Fungsi untuk merubah password
    const auth = getAuth();
    updatePassword(auth.currentUser, password).catch(error => {
      showError(error.message);
    });
  };

  const updateProfileUser = () => {
    const data = profile;
    data.photo = photo;

    if (data.fullname === '') {
      return showWarning('Fullname is required');
    } else if (data.fullname < 5) {
      return showWarning('Fullname of at least 5 characters');
    }

    if (data.profession === '') {
      showWarning('Profession is required');
    }

    const dbRef = ref(getDatabase());
    // Fungsi untuk merubah data profile biasa
    update(ref(Database, 'users/' + data.uid), data)
      .then(() => {
        get(child(dbRef, `users/${data.uid}`))
          .then(resDB => {
            if (resDB.val()) {
              storeData('user', resDB.val());
              showSuccess('Successfully to update data profile');
            }
          })
          .catch(errorDB => {
            showError(errorDB.message);
          });
      })
      .catch(error => {
        showError(error.message);
      });
  };

  const getPhoto = () => {
    launchImageLibrary(
      {quality: 0.5, maxWidth: 200, maxHeight: 200, mediaType: 'photo'},
      response => {
        if (response.didCancel || response.error) {
          showWarning(`Oops, you haven't selected a photo`);
        } else {
          // update data foto ke Realtime DB Firebase
          const source = {uri: response.assets[0].uri};
          setPhoto(source);
        }
      },
    );
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value.nativeEvent.text,
    });
  };

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      if (data.photo === undefined || data.photo === null) {
        setPhoto(ILNullPhoto);
      } else {
        setPhoto(data.photo);
      }
      setProfile(data);
    });
  }, []);

  return (
    <View style={styles.page}>
      <Header text="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile photo={photo} isRemove onPress={getPhoto} />
          <Input
            label="Nama Lengkap"
            value={profile.fullname}
            onChangeText={value => changeText('fullname', value)}
          />
          <Gap height={20} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={value => changeText('profession', value)}
          />
          <Gap height={20} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={20} />
          <Input
            label="Kata Sandi"
            typePassword
            value={password}
            onChangeText={value => setPassword(value.nativeEvent.text)}
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={updateProfile} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
