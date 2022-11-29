import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {colors} from '../../../utils/colors';

export default function Input({label}) {
  var textPlaceholder = 'Masukan ' + label;

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} placeholder={textPlaceholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
  },
  label: {
    fontSize: 16,
    color: '7D8797',
    marginBottom: 6,
    fontFamily: 'Nunito-Regular',
  },
});
