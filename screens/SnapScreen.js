import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Button, ScrollView, Image } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import getToken from './GetToken';
import { ActivityIndicator } from 'react-native';

export default function SnapScreen({navigation, route}) {

    const [token, setToken] = useState(null);
    const [ListSnap, setListSnap] = useState(null);
    const [loading, setLoading] = useState(true);
    const [DisplayImage, setDisplayImage] = useState(true);
    var snaps= [];
    var snapsContainer= [];
    
    const { CurrentSnap } = route.params;
    console.log("Current picture")
    console.log(CurrentSnap.data);
    var imageUrl = "http://149.91.89.133:6088/snap" + CurrentSnap.data.image.link;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
            source={{
                uri: imageUrl,
            }}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
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
})