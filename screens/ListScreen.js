import React, { useState, useEffect, useRef, Component, useLayoutEffect, useFocusEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Button, ScrollView } from 'react-native';
import { FlingGestureHandler } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getToken from './GetToken';
import { ActivityIndicator } from 'react-native';

export default function ListScreen() {
    
    const [currentToken, setcurrentToken] = useState(null);
    const [ListUser, setListUser] = useState(null);
    const [loading, setLoading] = useState(true);
    var users= [];
    var usersContainer= [];

    useEffect(() => {
        getToken().then((value) =>{
            UsersToGet(value);
        })
        const UsersToGet = async(tokenToSend) => {
            await fetch('http://149.91.89.133:6088/ALL', {
                headers:{'token':tokenToSend}
            })
                .then(r=>r.json())
                .then(res => {
                    if(res) {
                        res.data.map((element) => {
                            users.push(
                                element.email
                            )
                        });
                        setListUser(users);
                        setLoading(false);
                    } else {
                        return <View><Text>Erreur</Text></View>
                    }
                }
            )
        } 

    }, []);
    const goTo = () => {
        props.navigation.push('Register');
    }

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" loading={loading} />
            </View>
        );
    } else {
        return (<ScrollView contentContainerStyle={styles.container}>
            <ListUsers userArray={ListUser} />
        </ScrollView>)
    }
}

function ListUsers(props) {
    let usersContainer = [];

    props.userArray.map((element) => {
        usersContainer.push(
            <TouchableOpacity style={styles.button}>
                <Text style={styles.white}>{ element }</Text>
            </TouchableOpacity>
        );
    });
    return usersContainer;
};

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
        borderWidth: 0,
        backgroundColor: 'dodgerblue',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: "uppercase"
    },
    input: {
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 0,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 15
    },
    white: {
        textTransform: "uppercase",
        color: 'white'
    }
});
