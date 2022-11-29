import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ILLogo} from './../../assets';
import {Button, Link, Input, Gap} from '../../components/atoms';
import {colors, fonts} from '../../utils';

export default function Login({navigation}) {
  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>Masuk dan mulai konsultasi</Text>
      <Input label="Email Address" />
      <Gap height={24} />
      <Input label="Password" />
      <Gap height={10} />
      <Link title="Forgot your password?" size={12} />
      <Gap height={40} />
      <Button title="Sign In" onPress={() => navigation.navigate('MainApp')} />
      <Gap height={30} />
      <Link
        title="Create New Account"
        onPress={() => navigation.navigate('Register')}
        size={16}
        align="center"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
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
