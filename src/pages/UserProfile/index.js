import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header, List} from './../../components/molecules';
import Profile from '../../components/molecules/Profile';
import {Gap} from '../../components/atoms';
import {colors} from '../../utils';

export default function UserProfile({navigation}) {
  return (
    <View style={styles.page}>
      <Header text="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      <Profile name="Fadil Faishal Nafis" description="Backend Developer" />
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
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
