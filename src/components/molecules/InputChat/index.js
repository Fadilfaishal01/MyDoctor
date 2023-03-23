import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {Button} from '../../atoms';
import {colors, fonts} from '../../../utils';

export default function InputChat() {
  return (
    <View style={styles.page}>
      <TextInput
        style={styles.input}
        placeholder="Input Message to Fadil Faishal"
      />
      <Button type="btn-icon-send" />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 16,
    flexDirection: 'row',
  },
  input: {
    backgroundColor: colors.disable,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    maxHeight: 45,
  },
});
