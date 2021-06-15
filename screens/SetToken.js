import AsyncStorage from '@react-native-async-storage/async-storage';

const setToken = async (value) => {
    try {
        console.log('yes')
        await AsyncStorage.setItem('token', value)
    } 
    catch (e) {
        console.log(e)
    }
}

export default setToken;