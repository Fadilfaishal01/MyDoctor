import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header, List} from '../../components/molecules';
import {
  DummyDoctor1,
  DummyDoctor2,
  DummyDoctor3,
  DummyDoctor4,
} from '../../assets';
import {colors} from '../../utils';

export default function ListDoctor({navigation}) {
  return (
    <View style={styles.page}>
      <Header
        text="Choose Doctor"
        type="dark"
        onPress={() => navigation.goBack()}
      />
      <List
        onPress={() => navigation.navigate('Chatting')}
        type="next"
        profile={DummyDoctor1}
        name="Muhammad Renofa Alwasila"
        desc="Pria"
      />
      <List
        type="next"
        profile={DummyDoctor2}
        name="Muhammad Renofa Alwasila"
        desc="Pria"
      />
      <List
        type="next"
        profile={DummyDoctor3}
        name="Muhammad Renofa Alwasila"
        desc="Pria"
      />
      <List
        type="next"
        profile={DummyDoctor4}
        name="Muhammad Renofa Alwasila"
        desc="Pria"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
