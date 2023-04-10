import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity,Button, Image, View, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth, db,storage } from '../firebase';
import { Timestamp, doc, serverTimestamp, setDoc , getFirestore} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const PostScreen = ({navigation}) => {

   const [post, setPost] = useState("")
  const [rost,  setRost] = useState("")

//Pick image from expo
const storage = getStorage();
    const [image, setImage] = useState();
    const[per, setPerc] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
//end image code

 //Upload image to server
useEffect(()=>{
   const uploadFile = async() =>{
    
    const name =  image;
     const storageRef = ref(storage, "images/" + name.slice(137,260));
    const response = await fetch(image);
const blob = await response.blob();
const uploadTask = uploadBytesResumable(storageRef, blob);
 

uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
          break;
    }
  }, 
  (error) => {
    console.log(error);
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
     setImage({downloadURL});
    });
  }
);
   }
  
   image && uploadFile();

},[{image}] )


  const route = useRoute()
  const uid = route.params?.uid

 

  const handleData = async (e) => {
     console.log(uid)
   try{

     await setDoc(doc(db, post ,uid),{
      post,
      rost,
      image,
      timeStamp: serverTimestamp(),
     })
    } catch(err) {
      console.log(err);
    }
    
  }; 

  return (
    <KeyboardAvoidingView style={styles.container} behaviour="padding">

      <View style={styles.inputcontainer}>
        <TextInput placeholder='Email' 
        value={post} 
        onChangeText={text => setPost(text)} 
        style={styles.input}/>
       
       <TextInput placeholder='Password' 
        value={rost} 
        onChangeText={text => setRost(text)} 
        style={styles.input}
        secureTextEntry
        />
          
         {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>*/}
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            {/*</View>*/}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {handleData();}}  ////disabled= {per !==null && per<100} 
        style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity> 
      </View>

    </KeyboardAvoidingView>
  )
}

export default PostScreen

const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent: 'center',
    alignItems: "center",
    
},
inputcontainer:{
   width: "80%",
},
input:{
backgroundColor: "white",
paddingHorizontal: 15,
paddingVertical: 10,
borderRadius:10,
marginTop:5,
},

buttonContainer:{
  width:'60%',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 40,
},
button:{
  backgroundColor: '#0782f9',
  width:"100%",
  padding: 15,
  borderRadius:10,
  alignItems:"center",
},

buttonOutline:{
  backgroundColor: 'white',
    marginTop:5,
    borderColor: "black",
    borderWidth: 2,
},
buttonText:{
  color: "white",
  fontWeight: "700",
  fontSize: 16,
},
buttonOutlineText:{
  color: "black",
  fontWeight: "700",
  fontSize: 16,
},
})










































{/*import React, { useState, useEffect } from 'react'
import { Text, View, Button,  TextInput , StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
 import RNPickerSelect from "react-native-picker-select";
 import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { db } from '../firebase';

const Homescreen = () => {


  const handleAdd = async(e) =>{
    e.preventDefault()
    const res = await addDoc(collection(db, "cities", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
});
    console.log(res)
  }


    return (
        <View >
   
          <View >
          
       <View >
        <Text style={[styles.container6]}>Topic</Text>
     <TextInput
       placeholder="Topic"
       //value={Post}
       
       style={styles.input}
     />
     
   </View>

      <View >
        <Text style={[styles.container6]}>Description</Text>
     <TextInput
       placeholder="Description"
       //value={Post}
       
       style={styles.input}
     /></View>
    
      <View >
        <Text style={[styles.container6]}>Category</Text>
    {/*<RNPickerSelect
                 onValueChange={(value) => console.log(value)}
                 items={[
                     { label: "JavaScript", value: "JavaScript" },
                     { label: "Python", value: "Python" },
                     { label: "Java", value: "Java" },
                     { label: "C++", value: "C++" },
                     { label: "C", value: "C" },
                 ]}
             />*/}
   {/*</View>


      {/*<View>
        <Text style={[styles.container6]}>Location</Text>
     <TextInput
       placeholder="Location"
       //value={Post}
     
       style={styles.input}
     />
     
   </View>

      <View>
        <Text style={[styles.container6]}>Pictures</Text>
     <TextInput
       placeholder="UPLOAD PICTURE"
       //value={Post}
       
       style={styles.input}
     />
     <Button title="SHARE FEED"  />
   </View>
       </View>

         <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleAdd} style={styles.button} type="submit">
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity> 
      </View>

  
       <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          display: "flex",
          flexDirection: 'row',
          alignItems: "baseline",
          justifyContent:'space-evenly'  
        },
      ]}>

    <Button title="Home" 
    //onPress= {()=>navigateToHome()} 
    />
       <Button title="Post"
    //onPress= {()=>navigateToPost()}
    />
       <Button title="Profile"
    //onPress= {()=>navigateToProfile()}
    />
    
    </View>

   
    </View>    
    );


}

export default Homescreen;


   const styles = StyleSheet.create({
  container: {
    marginTop:100,
      
  },

  container2:{
    marginTop: 130,
    textAlign:'center',
          alignItems: "center",
          justifyContent:'center' 
  },

  container3:{
    width:1000
  },
  input: {
   height: 40,
   width: 450,
   margin: 12,
   borderWidth: 1,
   padding: 10,
  
 },
 container6:{
    marginTop:20,
    marginLeft:210,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-between'
    
 }
});
*/}
