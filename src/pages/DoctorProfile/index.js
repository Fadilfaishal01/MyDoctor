import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Header, ProfileItem} from '../../components/molecules';
import Profile from '../../components/molecules/Profile';
import {Button, Gap} from '../../components/atoms';
import {colors} from '../../utils';

export default function DoctorProfile({navigation, route}) {
  const dataDoctor = route.params;
  return (
    <View style={styles.container}>
      <Header text="Doctor Profile" onPress={() => navigation.goBack()} />
      <Profile
        photo={dataDoctor.data.photo}
        name={dataDoctor.data.fullname}
        description={dataDoctor.data.category}
      />
      <Gap height={10} />
      <ProfileItem label="Alumnus" description={dataDoctor.data.university} />
      <ProfileItem
        label="Tempat Praktik"
        description={dataDoctor.data.hospital_address}
      />
      <ProfileItem label="No. STR" description={dataDoctor.data.str_number} />
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
