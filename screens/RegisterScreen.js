import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Button } from 'react-native';
import { FlingGestureHandler } from 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const RegisterScreen = ({navigation}) => {
    const goToCamera = () => {
        navigation.navigate('Camera');
    }
    const goToLogin = () => {
        navigation.navigate('Login');
    }
    const [email, onChangeEmail] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goToLogin}>
                <View style={styles.button}>
                    <Text style={styles.white}>Page de connexion</Text>
                </View>
            </TouchableOpacity>

            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={onChangePassword}
                    placeholder="Password"
                    keyboardType="default"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => fetch('http://149.91.89.133:6088/inscription', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password,
                        })
                    })
                    .then(response => response.json())
                    .then(data => { 
                        if(data) {
                            console.log(data);
                            alert('Vous avez bien été inscrit');
                        }
                        else {
                            console.log('erreur');
                            alert('Une erreur est survenue');
                        }
                    })}
                >
                    <Text style={styles.white}>S'inscrire</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
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
});

export default RegisterScreen;
