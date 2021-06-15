import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Button, ScrollView } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import getToken from './GetToken';
import { ActivityIndicator } from 'react-native';

export default function ReceiveScreen({navigation, route}) {

    const [token, setToken] = useState(null);
    const [ListSnap, setListSnap] = useState(null);
    const [loading, setLoading] = useState(true);
    var snaps= [];
    var snapsContainer= [];
    
    useEffect(() => {
        getToken().then((value) =>{
            getSnaps(value);
            setToken(value);
        })

        const getSnaps = async(tokenToSend) => {
            fetch('http://149.91.89.133:6088/snaps', {
                method: 'GET',
                headers: {
                    'token': tokenToSend
                }
            })
            .then(response => response.json())
            .then(data => { 
                if(data) {
                    data.data.map((element) => {
                        snaps.push(
                            element
                        )
                    });
                    setListSnap(snaps);
                    setLoading(false);
                }
                else {
                    return <View><Text>Erreur</Text></View>
                }
            })
        }
    }, []);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" loading={loading} />
            </View>
        );
    } else {
        return (<ScrollView contentContainerStyle={styles.container}>
            <ListSnaps snapArray={ListSnap} tokenToSend={token} navigation={navigation} />
        </ScrollView>)
    }
}

function ListSnaps(props) {
    let snapsContainer = [];

    props.snapArray.map((element) => {
        snapsContainer.push(
            <TouchableOpacity style={styles.button} onPress={() => {
                fetch('http://149.91.89.133:6088/snap/' + element._id, {
                    method: 'GET',
                    headers: {
                        'token': props.tokenToSend
                    }
                })
                .then(response => response.json())
                .then(data => { 
                    if(data) {
                        props.navigation.navigate('Snap', {
                            CurrentSnap: data,
                        });
                    }
                    else {
                        return <View><Text>Erreur</Text></View>
                    }
                })
            }}>
                <Text style={styles.white}>{ element.from }</Text>
            </TouchableOpacity>
        );
    });
    return snapsContainer;
};

function Snap(props) {
    console.log("PONSEY")
    console.log(props.snap)
    return (
        <Text>
            snap
        </Text>
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