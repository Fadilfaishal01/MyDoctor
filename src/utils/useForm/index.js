import {useState} from 'react';

// Custom use state yg saya buat
export const useForm = initalValue => {
  /* initalValue
    param initalValue disini untuk memberikan nilai default dari form itu sendiri
    seperti username, email, password dan lain - lain
    */
  const [value, setValue] = useState(initalValue);

  // lalu kita return hasil value dari useState itu sendiri menggunakan hooks
  return [
    value,
    /* */
    (formType, formParams) => {
      /* Ini hooks yg kita buat untuk melempar data terbaru dari masing2 textInput tersebut, yg dimana value tersebut berada
      di parameter formParams, setelah itu kita akan mengambil semua value lama dari const value,
      lalu akan merubah datanya berdasarkan parameter formType diatas, dan mereturn semua data formnya
      */
      if (formType === 'reset') {
        return setValue(initalValue);
      }
      return setValue({...value, [formType]: formParams.nativeEvent.text});
    },
  ];
};
