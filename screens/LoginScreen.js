import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import { FlingGestureHandler } from "react-native-gesture-handler";
import setToken from "./SetToken";
import getToken from "./GetToken";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const LoginScreen =  ({ navigation }) => {
  const goTo = () => {
    navigation.navigate("Register");
  };
  const goToCamera = () => {
    navigation.navigate("Camera");
  };

  const [token, setHome] = useState(null);

  const handleSubmit = () => {
    fetch("http://149.91.89.133:6088/connection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())

      .then(async (response) => {
        if (response.message == "Successful login") {
            setToken(response.data.token);
            navigation.navigate("Home");          
        } else {
          alert("Une erreur est survenue lors de la connexion");
        }
      });
  };

  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goTo}>
        <View style={styles.button}>
          <Text style={styles.white}>Page d'inscription</Text>
        </View>
      </TouchableOpacity>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={onChangePassword}
          placeholder="Password"
          keyboardType="default"
          textContentType="password"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.white}>Se Connecter</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellow",
  },
  button: {
    height: 40,
    width: 300,
    maxWidth: "100%",
    margin: 12,
    borderWidth: 1,
    backgroundColor: "dodgerblue",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
  },
  input: {
    width: 300,
    height: 40,
    margin: 12,
    borderWidth: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
  },
  white: {
    color: "white",
  },
});

export default LoginScreen;
