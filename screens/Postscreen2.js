import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity,Button, Image, View, Platform } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { db, } from '../firebase';
import { collection, Timestamp, doc, serverTimestamp, setDoc , getFirestore} from 'firebase/firestore';
import { getStorage, ref, s, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import FooterNav from '../components/FooterNav';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { selectUid , selectAmail} from '../components/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

const PostScreen2 = ({navigation}) => {

   //location code
   const [isClicked, setIsClicked] = useState(false);
     const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);

const handleGetLocation = async () => {
      if (isClicked) {
          setLocation(null);
      setAddress(null);
      setErrorMsg(null);
      setIsClicked(false);
      }else{
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setAddress(geocode[0]);
      setIsClicked(true);
          
    }
  };


  let text = 'Location and address data not available';
  if (location && address ) {
    text = `${address.city}, ${address.region}, ${address.country}`;
    
  }
{/*End of location code*/}

  //method to extract the image from the previous page for these data(photo and uid)
    const route = useRoute();
  const [photo, setPhoto] = useState(route.params);
  console.log(photo)
/////////////////////////////
    const uid = useSelector(selectUid);
    const email = useSelector(selectAmail);
  console.log(uid)
///////////////////////////////
  //download url variable for images uploaded at firebase
   const [downloadURL, setDownloadURL] = useState(null);
   
   const [topic, setTopic] = useState("")
   const [describe,setDescription] = useState("")
   const [category,setCategory] = useState("")
//intializing firebase storage for images 
const storage = getStorage();
//upload images to the database
useEffect(()=>{
   const uploadFile = async() =>{
     const date = new Date();
    const name =  photo;
     const storageRef = ref(storage, "images/" + date.toLocaleString() + name.slice(137,260));
    const response = await fetch(photo);
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
     setPhoto(downloadURL);
    });
  }
);
   }
   photo && uploadFile();
},[downloadURL] )


  //upload other post details to the database
  const handleData = async (e) => { 
   try{
     await setDoc(doc(db, "cities" ,uid),{
      email,
      topic,
      describe,
      photo,
      location,
      selectedOption,
      timeStamp: serverTimestamp(),
     })
    } catch(err) {
      console.log(err);
    }  
  }; 
   //OPTIONS CODE TO PICK CATEGORY
   const [selectedOption, setSelectedOption] = useState('');
  const [ocation, setOcation] = useState('');

  const handleOptionChange = itemValue => {
    setSelectedOption(itemValue);
    setOcation(itemValue);
  };

  return (

    <LinearGradient colors={['#420C58',  '#211134', '#594677']} style={styles.contain} behaviour="padding">
    <KeyboardAvoidingView  >

      {/*Image*/}
      {photo && <Image source={{ uri: photo }} style={{ width: 50, height: 50 ,marginBottom: 20}} />}

       {/*Topic input */}
       <Text style={styles.Label}> Topic </Text>
        <TextInput placeholder='Enter topic of event ' 
        placeholderTextColor="white"
        value={topic} 
        onChangeText={text => setTopic(text)} 
        style={styles.input}/>
       
       {/*DESCRIBE INPUT*/}
       <Text style={styles.Label}> Description</Text>
       <TextInput placeholder='Description or summary of event ' 
       placeholderTextColor="white"
        value={describe} 
        onChangeText={text => setDescription(text)} 
        style={styles.input}
        
        />
          
          {/*Location*/}
          <Text style={styles.Label}> Location</Text>
         <TextInput placeholder='Input location of event or click to get location' 
       placeholderTextColor="white"
        value={location} 
        onChangeText={text => {setLocation(); }} 
        style={styles.input}
        
        />
            {errorMsg ? (
        <Text >{errorMsg}</Text>
      ) : location ? (
        <>
          <Text style={styles.locate}>Latitude: {location.coords.latitude}</Text>
          <Text style={styles.locate}>Longitude: {location.coords.longitude}</Text>
          <Text style={styles.locate}>Address: {address?.city}, {address?.region} {address?.postalCode}</Text>
            <Button title="Remove Location" onPress={handleGetLocation} />
        </>
      ) : (
         <Button title="Get Location" onPress={handleGetLocation} />
      )}

         <Text style={styles.Label}>Category:</Text>
         <View style={styles.box}>
      <Picker 
        selectedValue={selectedOption}
        onValueChange={handleOptionChange}
      >
        <Picker.Item label="Accident" value="Accident" style={styles.opption} />
        <Picker.Item label="Riot" value="Riot" style={styles.opption}/>
        <Picker.Item label="Fighting" value="Fighting"  style={styles.opption} />
      </Picker>
      </View>
      {/*<Text>Selected option: {selectedOption}</Text>
      <Text>Location: {ocation}</Text>*/}
      
        {/*Submit*/}
        <TouchableOpacity onPress={() => {handleData();}}  ////disabled= {per !==null && per<100} 
        style={styles.button}>
          <Text style={styles.buttonText}>POST</Text>
        </TouchableOpacity> 
   
   
    </KeyboardAvoidingView>
      <FooterNav/>
    </LinearGradient>
  )
}

export default PostScreen2

const styles = StyleSheet.create({
  contain:{
    flex:1,
    padding:20, 
},
input:{
 margin: 12,
    //borderWidth: 1,
    borderBottomWidth:1,
    borderColor:"#D1D0D0",
    fontWeight: "500",
  fontSize: 15,
paddingBottom:20,
color:"white",
},

buttonContainer:{
  width:'60%',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 40,
},
button:{
  backgroundColor: '#594677',
  width:"100%",
  padding: 15,
  borderRadius:10,
  alignItems:"center",
  marginTop:30,

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
locate:{
  fontSize: 20,
  color:"red"
},
Label:{
  fontSize:20,
  color:"#D1D0D0",
  fontWeight: "700",
  
},
opption:{
  fontSize:20,
  color:"#D1D0D0",
  fontWeight: "700",
  backgroundColor:"black",
  width:100,
},
box:{
  borderWidth: 3,
  margin: 10,
  borderColor:"white"
}

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