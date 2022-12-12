import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Header, Loading} from './../../components/molecules';
import {Button, Gap, Input} from './../../components/atoms';
import {useForm, colors} from '../../utils';
import {Database, FirebaseConfig} from './../../config';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {set, ref} from 'firebase/database';
import {showMessage, hideMessage} from 'react-native-flash-message';

export default function Register({navigation}) {
  const [form, setForm] = useForm({
    fullname: '',
    profession: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const onContinue = () => {
    setLoading(true);
    const auth = getAuth(FirebaseConfig);
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(userCredential => {
        const fieldDataUser = {
          fullname: form.fullname,
          profession: form.profession,
          email: form.email,
        };

        setLoading(false);
        setForm('reset');
        showMessage({
          icon: 'success',
          message: 'Successfully to register account',
          type: 'success',
        });

        // Create data to realtime database firebase
        set(ref(Database, 'users/' + userCredential.user.uid), fieldDataUser);
      })
      .catch(error => {
        setLoading(false);
        showMessage({
          icon: 'danger',
          message: error.message,
          type: 'danger',
        });
      });
  };

  return (
    <>
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
      {loading && <Loading />}
    </>
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
