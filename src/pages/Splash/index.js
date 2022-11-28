import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ILLogo} from '../../assets';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('GetStarted');
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
    color: "#112340",
    fontFamily: 'Nunito-SemiBold',
  },
  backgroundView: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
