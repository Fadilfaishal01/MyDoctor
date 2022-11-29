import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconDoctor, IconHospitals, IconMessages} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function TabItem({title}) {
  const Icon = () => {
    if (title === 'Doctor') {
      return <IconDoctor />;
    }

    if (title === 'Messages') {
      return <IconMessages />;
    }

    if (title === 'Hospital') {
      return <IconHospitals />;
    }

    return <IconDoctor />;
  };

  return (
    <View style={styles.container}>
      <Icon />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    color: colors.text.menuInactive,
    fontFamily: fonts.primary[600],
    marginTop: 4,
  },
});
