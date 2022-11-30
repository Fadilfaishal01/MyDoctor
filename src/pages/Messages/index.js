import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import List from '../../components/molecules/List';
import {colors, fonts} from './../../utils';
import {DummyDoctor4, DummyDoctor2, DummyDoctor6} from '../../assets';

export default function Messages({navigation}) {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      profile: DummyDoctor4,
      name: 'Fadil Faishal Nafis',
      desc: 'okey, thankyou for your time',
    },
    {
      id: 2,
      profile: DummyDoctor2,
      name: 'Muhammad Renofa Alsawila',
      desc: 'okey, i hope you get well son',
    },
    {
      id: 3,
      profile: DummyDoctor6,
      name: 'Muhammad Daffa Quraisy',
      desc: "okey, don't forget to cover your body",
    },
  ]);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {doctors.map(doctor => {
          return (
            <List
              onPress={() => navigation.navigate('Chatting')}
              profile={doctor.profile}
              name={doctor.name}
              desc={doctor.desc}
              key={doctor.id}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
    marginTop: 20,
    marginLeft: 16,
  },
});
