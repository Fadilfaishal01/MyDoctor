import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Header, List} from '../../components/molecules';
import {
  DummyDoctor1,
  DummyDoctor2,
  DummyDoctor3,
  DummyDoctor4,
} from '../../assets';
import {colors} from '../../utils';
import {
  child,
  equalTo,
  get,
  getDatabase,
  orderByChild,
  ref,
} from 'firebase/database';
import {FirebaseConfig} from '../../config';

export default function ListDoctor({navigation, route}) {
  const itemCategory = route.params;
  const dbRef = ref(getDatabase(FirebaseConfig));

  useEffect(() => {
    getListDoctorByCategory(itemCategory.category);
  }, []);

  const getListDoctorByCategory = category => {
    get(child(dbRef, 'doctors'), orderByChild('category'), equalTo(category))
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={styles.page}>
      <Header
        text={`Pilih ${itemCategory.category}`}
        type="dark"
        onPress={() => navigation.goBack()}
      />
      <List
        onPress={() => navigation.navigate('Chatting')}
        type="next"
        profile={DummyDoctor1}
        name="Muhammad Renofa Alwasila"
        desc="Pria"
      />
      <List
        type="next"
        profile={DummyDoctor2}
        name="Muhammad Renofa Alwasila"
        desc="Pria"
      />
      <List
        type="next"
        profile={DummyDoctor3}
        name="Muhammad Renofa Alwasila"
        desc="Pria"
      />
      <List
        type="next"
        profile={DummyDoctor4}
        name="Muhammad Renofa Alwasila"
        desc="Pria"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
