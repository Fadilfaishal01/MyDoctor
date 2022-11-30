import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  DummyHospital1,
  DummyHospital2,
  DummyHospital3,
  ILHospitalBG,
} from '../../assets';
import {colors, fonts} from '../../utils';
import {ListHospital} from '../../components/molecules';

export default function Hospital() {
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Ciomas Hospital</Text>
        <Text style={styles.desc}>3 Tersedia</Text>
      </ImageBackground>

      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ListHospital
            title="Hospital"
            type="Hospital Children"
            address="Bogor, Jl. Raya Bogor No. 1"
            pic={DummyHospital1}
          />
          <ListHospital
            title="Hospital"
            type="Hospital Soul"
            address="Bogor, Jl. Raya Bogor No. 2"
            pic={DummyHospital2}
          />
          <ListHospital
            title="Hospital"
            type="Hospital General"
            address="Bogor, Jl. Raya Bogor No. 3"
            pic={DummyHospital3}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  background: {
    height: 240,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 20,
    marginTop: -30,
    paddingHorizontal: 14,
  },
});
