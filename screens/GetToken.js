import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token')
  } 
  catch(e) {
    console.log(e)
  }  
}

  export default getToken;