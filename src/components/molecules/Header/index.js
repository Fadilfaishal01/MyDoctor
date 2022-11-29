import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Gap} from '../../atoms';
import {colors} from '../../../utils/colors';

export default function Header({onPress, text}) {
  return (
    <View style={styles.container}>
      <Button type="icon-only" icon="back-dark" onPress={onPress} />
      <Text style={styles.textHeader}>{text}</Text>
      <Gap width={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeader: {
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
    fontFamily: 'Nunito-SemiBold',
    color: colors.text.primary,
  },
});
