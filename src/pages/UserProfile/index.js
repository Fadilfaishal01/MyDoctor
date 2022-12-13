import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, List} from './../../components/molecules';
import Profile from '../../components/molecules/Profile';
import {Gap} from '../../components/atoms';
import {colors, getData} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {getAuth, signOut} from 'firebase/auth';
import {FirebaseConfig} from '../../config';
import { showMessage } from 'react-native-flash-message';

export default function UserProfile({navigation}) {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullname: '',
    profession: '',
  });

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

  const logout = () => {
    const auth = getAuth(FirebaseConfig);
    signOut(auth)
      .then(() => {
        showMessage({
          message: 'Berhasil logout',
          type: 'success',
          icon: 'success',
        });
        navigation.navigate('Login');
      })
      .catch(error => {
        showMessage({
          message: error.message,
          type: 'danger',
          icon: 'danger',
        });
      });
  };

  return (
    <View style={styles.page}>
      <Header text="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      <Profile
        name={profile.fullname}
        photo={profile.photo}
        description={profile.profession}
      />
      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="last Update Yesterday"
        icon="edit-profile"
        type="next"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        name="Language"
        desc="last Update Yesterday"
        icon="language"
        type="next"
      />
      <List name="Rate" desc="last Update Yesterday" icon="rate" type="next" />
      <List name="Help" desc="last Update Yesterday" icon="help" type="next" />
      <List
        name="Logout"
        desc="last Update Yesterday"
        icon="help"
        onPress={logout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
