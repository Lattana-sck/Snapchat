import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SendScreen from './screens/SendScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CameraScreen from './screens/CameraScreen';
import HomeScreen from './screens/HomeScreen';
import ReceiveScreen from './screens/ReceiveScreen';
import ListScreen from './screens/ListScreen';
import SnapScreen from './screens/SnapScreen';

const { Navigator, Screen } = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Register" component={RegisterScreen} />
        <Screen name="Login" component={LoginScreen} />
        <Screen name="Camera" component={CameraScreen} />
        <Screen name="Send" component={SendScreen} />
        <Screen name="Snaps" component={ReceiveScreen} />
        <Screen name="List" component={ListScreen} />
        <Screen name="Snap" component={SnapScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
