import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ILLogo} from '../../assets';
import {colors, fonts} from '../../utils';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {FirebaseConfig} from '../../config';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      const auth = getAuth(FirebaseConfig);
      onAuthStateChanged(auth, user => {
        if (user) {
          navigation.replace('MainApp');
        } else {
          navigation.replace('GetStarted');
        }
      });
    }, 3000);
  }, []);

  return (
    <View style={styles.backgroundView}>
      <ILLogo />
      <Text style={styles.textDoctor}>My Doctor</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textDoctor: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
  },
  backgroundView: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
