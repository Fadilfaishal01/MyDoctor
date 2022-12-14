import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Header} from '../../components/molecules';
import {IconAddPhoto, IconRemovePhoto, ILNullPhoto} from './../../assets';
import {Button, Gap, Link} from '../../components/atoms';
import {colors, fonts, showWarning, storeData} from '../../utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {update, ref} from 'firebase/database';
import {Database} from '../../config';

export default function UploadPhoto({navigation, route}) {
  const {fullname, profession, uid} = route.params;
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');

  const getPhoto = () => {
    launchImageLibrary(
      {quality: 0.5, maxWidth: 200, maxHeight: 200, mediaType: 'photo'},
      response => {
        if (response.didCancel || response.error) {
          showWarning(`Oops, you haven't selected a photo`);
        } else {
          // update data foto ke Realtime DB Firebase
          const source = {uri: response.assets[0].uri};
          setPhotoForDB(response.assets[0].uri);
          setPhoto(source);
          setHasPhoto(true);
        }
      },
    );
  };

  const uploadAndContinue = () => {
    const data = route.params;
    data.photo = photoForDB;
    update(ref(Database, 'users/' + uid), data);
    // save data ke local storage dengan menambahkan data foto
    storeData('user', data);
    navigation.replace('MainApp');
  };

  return (
    <View style={styles.page}>
      <Header text="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getPhoto}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
          </TouchableOpacity>
          <Text style={styles.name}>{fullname}</Text>
          <Text style={styles.profession}>{profession}</Text>
        </View>
        <View>
          {hasPhoto && (
            <Button title="Upload and continue" onPress={uploadAndContinue} />
          )}
          {!hasPhoto && <Button title="Upload and continue" disable />}
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            size={16}
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 64,
    flex: 1,
    justifyContent: 'space-between',
  },
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  avatar: {
    position: 'relative',
    width: 110,
    height: 110,
    borderRadius: 130 / 2,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  profession: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: 4,
  },
});
