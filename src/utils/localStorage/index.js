import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    /* Mengubah value yang disimpan menjadi string, karena localstorage hanya bisa menyimpan data string
       sehingga jika valuenya itu berupa objek, kita harus mengubahnya terlebih dahulu menjadi string */
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log('Error store data local storage : ', e);
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      /* Mengambil value dari key di local storage dan mengembalikan nilainya ke depan dengan mengubahnya kembali dari string menjadi
         objek */
      return JSON.parse(value);
    } else {
      console.log('Data tidak ada di local storage');
    }
  } catch (e) {
    console.log('Error get data local storage : ', e);
  }
};
