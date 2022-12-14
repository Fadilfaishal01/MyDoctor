import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  DummyHospital1,
  DummyHospital2,
  DummyHospital3,
  ILHospitalBG,
} from '../../assets';
import {colors, fonts} from '../../utils';
import {ListHospital} from '../../components/molecules';
import {child, get, getDatabase, ref} from 'firebase/database';
import {FirebaseConfig} from '../../config';

export default function Hospital() {
  const [hospital, setHospital] = useState([]);
  useEffect(() => {
    const dbRef = ref(getDatabase(FirebaseConfig));
    get(child(dbRef, 'hospital/')).then(res => {
      if (res.val()) {
        setHospital(res.val());
      }
    });
  }, []);
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Ciomas Hospital</Text>
        <Text style={styles.desc}>{hospital.length} Tersedia</Text>
      </ImageBackground>

      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {hospital.map(item => {
            return (
              <ListHospital
                key={item.id}
                title={item.name}
                type={item.type}
                address={item.location}
                pic={item.img}
              />
            );
          })}
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
