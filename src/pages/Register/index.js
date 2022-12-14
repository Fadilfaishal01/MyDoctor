import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Header} from './../../components/molecules';
import {Button, Gap, Input} from './../../components/atoms';
import {useForm, colors, storeData, showSuccess, showError} from '../../utils';
import {Database, FirebaseConfig} from './../../config';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {set, ref} from 'firebase/database';
import {useDispatch} from 'react-redux';

export default function Register({navigation}) {
  const [form, setForm] = useForm({
    fullname: '',
    profession: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const onContinue = () => {
    dispatch({type: 'SET_LOADING', value: true});
    const auth = getAuth(FirebaseConfig);
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(userCredential => {
        const fieldDataUser = {
          fullname: form.fullname,
          profession: form.profession,
          email: form.email,
          uid: userCredential.user.uid,
        };
        dispatch({type: 'SET_LOADING', value: false});
        setForm('reset');
        showSuccess('Successfully to register account');

        // Create data to realtime database firebase
        set(ref(Database, 'users/' + userCredential.user.uid), fieldDataUser);

        // Store data to local storage
        storeData('user', fieldDataUser);

        // Redirect ke halaman upload photo dengan mengirimkan params data user
        navigation.navigate('UploadPhoto', fieldDataUser);
      })
      .catch(error => {
        dispatch({type: 'SET_LOADING', value: false});
        showError(error.message);
      });
  };

  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} text="Daftar Akun" />
      <Gap height={20} />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Full Name"
            value={form.fullname}
            onChangeText={value => setForm('fullname', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={form.profession}
            onChangeText={value => setForm('profession', value)}
          />
          <Gap height={24} />
          <Input
            label="Email"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            typePassword
          />
          <Gap height={40} />
          <Button title="Continue" onPress={onContinue} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
