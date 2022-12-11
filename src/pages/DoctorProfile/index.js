import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Header, ProfileItem} from '../../components/molecules';
import Profile from '../../components/molecules/Profile';
import {Button, Gap} from '../../components/atoms';
import {colors} from '../../utils';

export default function DoctorProfile({navigation}) {
  return (
    <View style={styles.container}>
      <Header text="Doctor Profile" onPress={() => navigation.goBack()} />
      <Profile name="Fadil Faishal Nafis" description="Dokter Anak" />
      <Gap height={10} />
      <ProfileItem label="Alumnus" description="Universitas Terbuka, 2021" />
      <ProfileItem
        label="Tempat Praktik"
        description="Rumah Sakit Bogor, 2022"
      />
      <ProfileItem label="No. STR" description="00041244123" />
      <View style={styles.action}>
        <Button
          title="Start Consultation"
          onPress={() => navigation.navigate('Chatting')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  action: {
    paddingHorizontal: 40,
    paddingTop: 23,
  },
});
