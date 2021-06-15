import React, {useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import getToken from './GetToken';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {

    const goToLogin = () => {
        navigation.navigate('Login');
    }

    const goToRegister = () => {
        navigation.navigate('Register');
    }
    
    const goToSend = () => {
        navigation.navigate('Camera');
    }
    const goToSendLocal = () => {
        navigation.navigate('Send');
    }

    const goToReceive = () => {
        navigation.navigate('Snaps');
    }

    const logout = async() => {
        
        try {
            await AsyncStorage.removeItem('token');
            setToken(null);
            navigation.navigate('Home');
        } 
        catch(e) {
            console.log(e);
        }
        console.log('Done.')

    }

    const [token, setToken] = useState(null);
    
    useFocusEffect(()=>{
        getToken().then(res => setToken(res));
    })
    
    if(!token) {
        return (
            <View style={styles.container}>
            <Image
                source={{
                    uri: 'https://pic.clubic.com/v1/images/1859731/raw'
                }}
                style={styles.img}
            />
            <TouchableOpacity onPress={goToLogin}>
                <View style={styles.button}>
                    <Text style={styles.white}>Page de connexion</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToRegister}>
                <View style={styles.button}>
                    <Text style={styles.white}>Page d'inscription</Text>
                </View>
            </TouchableOpacity>
        </View>
        )
    }
    else {
        return(
            <View style={styles.container}>
            <TouchableOpacity onPress={goToSend}>
                <View style={styles.button}>
                    <Text style={styles.white}>Envoyer un snap via caméra</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToSendLocal}>
                <View style={styles.button}>
                    <Text style={styles.white}>Envoyer un snap via fichiers locaux</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToReceive}>
                <View style={styles.button}>
                    <Text style={styles.white}>Voir les snaps reçus</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
                <View style={styles.button}>
                    <Text style={styles.white}>Se déconnecter</Text>
                </View>
            </TouchableOpacity>
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "yellow"
    },
    button: {
        height: 40,
        width: 300,
        maxWidth: '100%',
        margin: 12,
        borderWidth: 1,
        backgroundColor: 'dodgerblue',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: "uppercase"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 15
    },
    white: {
        color: 'white'
    },
    img: {
        height: 300,
        width: 300
    }
});

export default HomeScreen;