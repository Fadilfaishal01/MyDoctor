import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ILNullPhoto} from './../../../assets';
import {colors, fonts, getData} from '../../../utils';

export default function HomeProfile({onpress}) {
  // Buat state untuk menampung data dari local storage
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullname: '',
    profession: '',
  });

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      if (data.photo === undefined || data.photo === null) {
        data.photo = ILNullPhoto;
      } else {
        data.photo = {uri: res.photo};
      }
      setProfile(data);
    });
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={onpress}>
      <Image source={profile.photo} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{profile.fullname}</Text>
        <Text style={styles.profession}>{profile.profession}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  profession: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
});
