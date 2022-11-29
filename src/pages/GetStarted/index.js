import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ILLogo, ILGetStarted} from '../../assets';
import {Gap, Button} from '../../components/atoms';
import {colors, fonts} from '../../utils';

export default function GetStarted({navigation}) {
  return (
    <ImageBackground source={ILGetStarted} style={styles.page}>
      <View>
        <ILLogo />
        <Text style={styles.title}>
          Konsultasi dengan dokter jadi lebih mudah & fleksibel
        </Text>
      </View>
      <View>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('Register')}
        />
        <Gap height={15} />
        <Button
          type="secondary"
          title="Sign In"
          routeUrl="Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 28,
    color: colors.white,
    marginTop: 91,
    fontFamily: fonts.primary[600],
  },
  spaceButton: {
    height: 16,
  },
});
