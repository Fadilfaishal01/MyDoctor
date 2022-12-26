import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  HomeProfile,
  DoctorCategory,
  RatedDoctor,
  NewsItem,
} from './../../components/molecules';
import {colors, fonts, showError} from '../../utils';
import {Gap} from '../../components/atoms';
import {
  DummyDoctor1,
  DummyDoctor2,
  DummyDoctor3,
  JSONCategoryDoctor,
} from '../../assets';
import {
  child,
  get,
  getDatabase,
  ref,
  orderByChild,
  limitToLast,
} from 'firebase/database';
import {FirebaseConfig} from '../../config';
import {useDispatch} from 'react-redux';

export default function Doctor({navigation}) {
  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [rateDoctor, setRateDoctor] = useState([]);

  const dbRef = ref(getDatabase(FirebaseConfig));
  const dispath = useDispatch();

  useEffect(() => {
    get(child(dbRef, 'news/')).then(res => {
      if (res.val()) {
        setNews(res.val());
      }
    });

    get(child(dbRef, 'category-doctor/'))
      .then(res => {
        if (res.val().length > 0) {
          setCategoryDoctor(res.val());
        }
      })
      .catch(err => {
        showError(err.message());
      });

    getTopRateDoctor();
  }, []);

  const parseObjectToArray = listRateDoctor => {
    const data = [];
    Object.keys(listRateDoctor).map(key => {
      data.push({
        id: key,
        data: listRateDoctor[key],
      });
    });

    return data;
  };

  const getTopRateDoctor = () => {
    get(child(dbRef, 'doctors/'), orderByChild('rate'), limitToLast(3))
      .then(res => {
        if (res.val()) {
          const data = parseObjectToArray(res.val());
          setRateDoctor(data);
        }
      })
      .catch(err => {
        showError(err.message());
      });
  };

  return (
    <>
      <View style={styles.page}>
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperSection}>
              <Gap height={30} />
              <HomeProfile onpress={() => navigation.navigate('UserProfile')} />
              <Text style={styles.welcome}>
                Mau konsultasi dengan siapa hari ini?
              </Text>
            </View>
            <View style={styles.wrapperScroll}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.category}>
                  <Gap width={32} />
                  {categoryDoctor.map(valueCategory => {
                    return (
                      <DoctorCategory
                        category={valueCategory.category}
                        key={valueCategory.id}
                        onPress={() =>
                          navigation.navigate('ListDoctor', valueCategory)
                        }
                      />
                    );
                  })}
                  <Gap width={22} />
                </View>
              </ScrollView>
            </View>
            <Text style={styles.labelSection}>Top Rated Doctor</Text>
            <View style={styles.wrapperSection}>
              {rateDoctor.map(item => {
                return (
                  <RatedDoctor
                    key={item.id}
                    name={item.data.fullname}
                    description={item.data.category}
                    avatar={item.data.photo}
                    rate={item.data.rate}
                    onPress={() => navigation.navigate('DoctorProfile', item)}
                  />
                );
              })}
            </View>
            <Text style={styles.labelSection}>Good News</Text>
            {news.map(item => {
              return (
                <NewsItem
                  key={item.id}
                  title={item.title}
                  date={item.date}
                  image={item.img}
                />
              );
            })}
            <Gap height={30} />
          </ScrollView>
        </View>
      </View>
    </>
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
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  labelSection: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});
