import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Button, Modal } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getToken from './GetToken';

var target = '';
const changeTarget = async (currentTarget) => {
  target = currentTarget
} 
const WINDOW_HEIGHT = "80%";
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

export default function CameraTest({navigation}) {
  const goToList = () => {
    navigation.navigate('List');
  }
  const [currentToken, setcurrentToken] = useState(null);
  const tokenToGet = async() => {
    // return await getToken();
    setcurrentToken(await getToken());
  } 
  tokenToGet();

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const cameraRef = useRef();

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  const onSnap = async () => {
    if (cameraRef.current) {
        const options = { quality: 0.7, base64: true, skipProcessing: true };
        const data = await cameraRef.current.takePictureAsync(options);
        const source = data.base64;
    
        if (source) {
          cameraRef.current.pausePreview();
          setIsPreview(true);
        }
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        type={type}
        ref={cameraRef}>
          <TouchableOpacity
            onPress={cancelPreview}
            style={[styles.closeButton, styles.left]}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={34} color="black" />
          </TouchableOpacity>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <TouchableOpacity 
                style={styles.takePicture}
                onPress={onSnap}>
              </TouchableOpacity>
            </TouchableOpacity>
            
          {isPreview && (
            <>
              <TouchableOpacity
                onPress={() => {
                  goToList()
                }}
                style={[styles.icons, styles.top, styles.right]}
                activeOpacity={0.7}
                >
                <Ionicons name="add-circle-outline" size={34} color="black" />
              </TouchableOpacity>
          </>
          )}
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: "yellow"
  },
  flipButton: {
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
      height: "100%",
      borderWidth: 0,
      fontSize: 14 ,
      fontWeight: "normal",
      padding: 10,
      textTransform: "uppercase"
  },
  input: {
    width: 300,
    height: 40,
    margin: 12,
    borderWidth: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15
  },
  flip: {
    width: "100%", 
    height: "10%"
  },
  takePicture: {
    width: 100, 
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0)",
    borderWidth: 2,
    borderColor: "white",
    zIndex: 8000
  },
  capture: {
    backgroundColor: '#5A45FF',
    borderRadius: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 28,
    marginHorizontal: 30
  },
  closeButton: {
    position: 'absolute',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 10,
    width: 50, 
    height: 50, 
    color: '#fff',
    backgroundColor: "white",
    textAlign: 'center',
    borderRadius: 50,
    zIndex: 9000,
  },
  icons: {
    position: 'absolute',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
    width: 50, 
    height: 50, 
    color: '#fff',
    backgroundColor: "white",
    textAlign: 'center',
    borderRadius: 50,
    zIndex: 9000,
  },
  form: {
    position: 'absolute',
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    bottom: "20%",
    textAlign: 'center',
    zIndex: 9000,
  },
  left: {
    left: 10
  },
  right: {
    right: 10
  },
  top: {
    top: 10
  },
  bottom: {
    bottom: 10
  },
  middle: {
    top: "50%"
  },
  camera: {
    position: 'relative'
  }
});