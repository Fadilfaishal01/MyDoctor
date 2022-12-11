import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Header} from './../../components/molecules';
import {Button, Gap, Input} from './../../components/atoms';
import {useForm, colors} from '../../utils';
import {FirebaseConfig} from './../../config';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

export default function Register({navigation}) {
  const [form, setForm] = useForm({
    fullname: '',
    profession: '',
    email: '',
    password: '',
  });
  const onContinue = () => {
    const auth = getAuth(FirebaseConfig);
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(userCredential => {
        // Signed in
        console.log(userCredential);
        // ...
      })
      .catch(error => {
        const errorMessage = error.message;
        console.log('Error Register: ', errorMessage);
        // ..
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
