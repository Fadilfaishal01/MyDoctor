import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ILLogo} from './../../assets';
import {Button, Link, Input, Gap} from '../../components/atoms';
import {
  colors,
  fonts,
  showError,
  showSuccess,
  storeData,
  useForm,
} from '../../utils';
import {FirebaseConfig} from '../../config';
import {signInWithEmailAndPassword, getAuth} from 'firebase/auth';
import {child, get, getDatabase, ref} from 'firebase/database';
import {useDispatch} from 'react-redux';

export default function Login({navigation}) {
  const [form, setForm] = useForm({email: '', password: ''});
  const dispatch = useDispatch();

  const loginAuthentication = () => {
    dispatch({type: 'SET_LOADING', value: true});
    const auth = getAuth(FirebaseConfig);
    const dbRef = ref(getDatabase());
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(res => {
        dispatch({type: 'SET_LOADING', value: false});
        get(child(dbRef, `users/${res.user.uid}`))
          .then(resDB => {
            if (resDB.val()) {
              showSuccess(
                `Successfully for login, Welcome ${resDB.val().fullname}`,
              );
              storeData('user', resDB.val());
              navigation.replace('MainApp');
            }
          })
          .catch(errorDB => {
            dispatch({type: 'SET_LOADING', value: false});
            showError(errorDB.message);
          });
      })
      .catch(error => {
        dispatch({type: 'SET_LOADING', value: false});
        showError(error.message);
      });
  };

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={40} />
        <ILLogo />
        <Text style={styles.title}>Masuk dan mulai konsultasi</Text>
        <Input
          label="Email Address"
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
        <Gap height={10} />
        <Link title="Forgot your password?" size={12} />
        <Gap height={40} />
        <Button title="Sign In" onPress={loginAuthentication} />
        <Gap height={30} />
        <Link
          title="Create New Account"
          onPress={() => navigation.navigate('Register')}
          size={16}
          align="center"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginVertical: 40,
    maxWidth: 153,
  },
});
