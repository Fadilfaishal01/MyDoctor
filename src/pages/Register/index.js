import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Header} from './../../components/molecules';
import {Button, Gap, Input} from './../../components/atoms';
import {colors} from '../../utils/colors';

export default function Register({navigation}) {
  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} text="Daftar Akun" />
      <Gap height={20} />
      <View style={styles.content}>
        <Input label="Full Name" />
        <Gap height={24} />
        <Input label="Pekerjaan" />
        <Gap height={24} />
        <Input label="Email" />
        <Gap height={24} />
        <Input label="Password" />
        <Gap height={40} />
        <Button
          title="Continue"
          onPress={() => navigation.navigate('UploadPhoto')}
        />
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
