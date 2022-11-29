import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../../utils/colors';

export default function Link({title, onPress, size, align}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.link(size, align)}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  link: (size, align) => ({
    fontSize: size,
    color: colors.text.secondary,
    fontFamily: 'Nunito-Regular',
    textDecorationLine: 'underline',
    textAlign: align,
  }),
});
