import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IconRemovePhoto} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function Profile({name, description, photo, isRemove, onPress}) {
  return (
    <View style={styles.container}>
      {isRemove && (
        <TouchableOpacity style={styles.borderProfile} onPress={onPress}>
          <Image source={photo} style={styles.avatar} />
          <IconRemovePhoto style={styles.removePhoto} />
        </TouchableOpacity>
      )}
      {!isRemove && (
        <View style={styles.borderProfile}>
          <Image source={photo} style={styles.avatar} />
        </View>
      )}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.profession}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 115,
    height: 115,
    borderRadius: 115 / 2,
  },
  borderProfile: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 14,
  },
  profession: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    marginTop: 2,
  },
  removePhoto: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
});
