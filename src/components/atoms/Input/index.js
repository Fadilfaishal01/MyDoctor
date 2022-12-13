import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../utils/colors';

export default function Input({
  label,
  value,
  onChangeText,
  typePassword,
  disable,
}) {
  var textPlaceholder = 'Masukan ' + label;
  const [border, setBorder] = useState(colors.border);
  const onFocusForm = () => {
    setBorder(colors.tertiary);
  };
  const onBlurForm = () => {
    setBorder(colors.black);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input(border)}
        placeholder={textPlaceholder}
        value={value}
        onChange={onChangeText}
        secureTextEntry={typePassword} // Untuk membuat inputan menjadi secure atau tidak dapat dilihat oleh orang lain
        editable={!disable} // untuk membuatnya menjadi disable
        selectTextOnFocus={!disable} // untuk membuatnya menjadi disable
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: border => ({
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    padding: 12,
  }),
  label: {
    fontSize: 16,
    color: '7D8797',
    marginBottom: 6,
    fontFamily: 'Nunito-Regular',
  },
});
