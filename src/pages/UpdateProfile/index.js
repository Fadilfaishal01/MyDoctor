import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header} from '../../components/molecules';
import Profile from '../../components/molecules/Profile';
import {Button, Gap, Input} from '../../components/atoms';
import {colors, getData, storeData} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {child, get, getDatabase, ref, update} from 'firebase/database';
import {Database} from '../../config';
import {showMessage} from 'react-native-flash-message';

export default function UpdateProfile({navigation}) {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullname: '',
    profession: '',
    email: '',
    uid: '',
  });

  const [password, setPassword] = useState('');

  const updateProfile = () => {
    const dataSementara = {
      fullname: profile.fullname,
      profession: profile.profession,
    };

    const data = profile;
    data.photo = profile.photo.uri;
    const dbRef = ref(getDatabase());
    // update(ref(Database, 'users/' + data.uid), data)
    update(ref(Database, 'users/' + data.uid), dataSementara)
      .then(() => {
        get(child(dbRef, `users/${data.uid}`))
          .then(resDB => {
            if (resDB.val()) {
              showMessage({
                message: 'Berhasil mengubah data profile',
                type: 'success',
                icon: 'success',
              });
              storeData('user', resDB.val());
              navigation.replace('UserProfile');
            }
          })
          .catch(errorDB => {
            showMessage({
              message: errorDB.message,
              type: 'danger',
              icon: 'danger',
            });
          });
      })
      .catch(error => {
        showMessage({
          message: error.message,
          type: 'danger',
          icon: 'danger',
        });
      });
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
        data.photo = ILNullPhoto;
      } else {
        data.photo = {uri: res.photo};
      }
      setProfile(data);
    });
  }, []);

  return (
    <View style={styles.page}>
      <Header text="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile photo={profile.photo} isRemove />
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
          <Input label="Kata Sandi" typePassword value={password} />
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
