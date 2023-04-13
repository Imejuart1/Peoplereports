import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

export default function Discover({navigation}) {

   
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
   const [photos, setPhotos] = useState([]);

   const [selectedImage, setSelectedImage] = useState(null);


   const handlePicture = ()=>{
         navigation.navigate("Post", photo);
   }
   
//Always update recent photos
  useEffect(() => {
    getRecentPhotos();
  }, []);
///////////////////////////////
  //getRecent photos from storage
  const getRecentPhotos = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();  
    if (status === 'granted') {
      const { assets } = await MediaLibrary.getAssetsAsync({ 
        sortBy: MediaLibrary.SortBy.creationTime,
        first: 40, // Change this number to show more or fewer pictures
      });
      setPhotos(assets);
    } else {
      // Permissions not granted
    }
  };
/////////////////////////////////
//Permission to get access to camera
  useEffect(() => {
    getPermissionsAsync();
  }, []);
  const getPermissionsAsync = async () => {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll and camera permissions to make this work!');
      }
    }
  };

  //Snap picture and setphoto to path
  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
    }
  };
  //////////////////////////////////
  //Snap picture and setphoto to path
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
   
    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };
//////////////////////////////////

 const renderItem = ({ item }) => (
    
    <TouchableOpacity onPress={() => {if (item.uri === setPhoto) {setPhoto(null); } else {setPhoto(item.uri); }}} activeOpacity={0.8}>
    <Image style={[styles.photos , photo === item.uri && styles.selectedImage]} source={{ uri: item.uri }} />
    
    </TouchableOpacity>
  );


  return (
     <LinearGradient colors={['#420C58',  '#211134', '#594677']} style={styles.container} behaviour="padding" >
    <View >
    {/* Display selected photo */}
    
        {/*<Image style={styles.photo} source={{ uri: photo }} />*/}
            <TouchableOpacity style={styles.postButton} onPress={handlePicture} disabled={!photo}>
        <Text style={styles.postButtonText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setPhoto(!photo)}>
      
      {photo ? (
        
           <Image source={{ uri: photo }} style={styles.selectedIage}></Image>
          
      ) : (
        <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={(ref) => setCamera(ref)} />
      )}
      {/*---------------------------*/}
      </TouchableOpacity>
    
      {/*Buttons to select */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Ionicons name="camera" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Ionicons name="image-outline" size={32} color="white" />
        </TouchableOpacity>
       
      </View>
      <Text style={styles.test}> Tap to remove image</Text>
      {/*------------------------------*/}

       {photo && <Image source={{ uri: photo }} style={styles.selectedImage} />}
       
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
          renderItem={renderItem}
        numColumns={3}
      />

    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    
  },
  camera: {
  width:450,
    height:600,
   marginTop:10
  },
  photo: {
   width:450,
    height:750,
    marginTop:10
  },
  photos:{
     width: 120,
    height: 100,
    margin: 15,
    alignItems:"center"
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
   // marginBottom: 30,
  },
  button: {
    marginHorizontal: 20,
  },
  postButton: {
    marginTop:10,
    opacity: 0.8,
    alignSelf:"flex-end"
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    marginRight: 10,
  },
   selectedImage: {
  
    resizeMode: 'contain',
    marginBottom: 10,
  },
    selectedIage: {
      width: 450,
    height: 600,
    marginTop:10
    
  },
  test:{
    color: "white",
    margin:13,
    fontSize:20
  }
});
