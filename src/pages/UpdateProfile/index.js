import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header} from '../../components/molecules';
import Profile from '../../components/molecules/Profile';
import {Button, Gap, Input} from '../../components/atoms';
import {colors} from '../../utils';

export default function UpdateProfile({navigation}) {
  return (
    <View style={styles.page}>
      <Header text="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile
            name="Fadil Faishal Nafis"
            description="Backend Developer"
            isRemove
          />
          <Gap height={30} />
          <Input label="Nama Lengkap" />
          <Gap height={20} />
          <Input label="Pekerjaan" />
          <Gap height={20} />
          <Input label="Email" />
          <Gap height={20} />
          <Input label="Kata Sandi" />
          <Gap height={40} />
          <Button title="Save Profile" onPress={() => navigation.goBack()} />
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
