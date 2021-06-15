import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Button, Platform, Image } from 'react-native';
import { FlingGestureHandler } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getToken from './GetToken';

import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample({route, navigation}) {
    const goToList = () => {
        navigation.navigate('List');
    }
    const [currentToken, setcurrentToken] = useState(null);
    const tokenToGet = async() => {
        // return await getToken();
        setcurrentToken(await getToken());
    } 
    tokenToGet();
    const [image, setImage] = useState(null);

    var tokenPromise = AsyncStorage.getItem('userToken');
    var token;
    tokenPromise.then(function(result) {
        token = result;
    });
    
    

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "yellow" }}>
            <TouchableOpacity onPress={goToList}>
                <View style={styles.button}>
                    <Text style={styles.white}>Envoyer</Text>
                </View>
            </TouchableOpacity>
            <Button title="Choisir une image" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 250, height: 250, marginTop: 10 }} />}
        </View>
    );
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
        borderWidth: 0,
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
        color: 'white',
        textTransform: "uppercase"
    },
    img: {
        height: 300,
        width: 300
    }
});