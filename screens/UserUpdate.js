import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, getUser, updateEmail,updatePassword, updateProfile, createUserWithEmailAndPassword ,signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
import { useNavigation, useRoute ,useFocusEffect} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectUid , selectAmail} from '../components/authSlice';
import { getStorage, ref, s, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../firebase';
import { getFirestore, collection, onSnapshot, doc, getDoc } from "firebase/firestore";

const UserUpdate = ({navigation}) => {
  
   const [cities, setCities] = useState([]);
    const [userData, setUserData] = useState(null);
   const [profile, setProfile] = useState(null);
   const [email, setEmail] = useState("")
  const [password,  setPassword] = useState("")
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [photo, setPhoto] = useState("");
    const uid = useSelector(selectUid);

useFocusEffect(
React.useCallback(() => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    setEmail(user.email);
    setUsername(user.displayName);
    setPhoto(user.photoURL);
  }
}, [])
);

useEffect(() => {

const fetchUserData = async () => {
try{
  const docRef = doc(db, "users", uid)
  const docSnap = await getDoc(docRef)
  setUserData(docSnap.data())
}catch(error){
  console.log(error)
}
};
 fetchUserData();
}, []);

   return (
         <LinearGradient colors={['#420C58',  '#211134', '#594677']} 

         style={styles.container} >
      <View style={styles.contain}>
    <View style={styles.profilePictureContainer}>
    {photo ? (
           <Image source={{ uri: photo }} style={styles.profilePicture}></Image>
      ) : (
         <Image
          style={styles.profilePicture}
          source={{ uri: 'https://i.imgur.com/SYVJvjA.png' }}   
        />
      )}
     </View>
       <View>
        <Text style={styles.input}>Email: {email}</Text>
  
       </View>

       <View>
         <Text style={styles.input}>Username: {username}</Text>
       </View>
      <View>
          {/*{userData ?
            <Text style={styles.input}>FullName: {userData.fullName}</Text>
            :
            <Text style={styles.input} >FullName: Loading</Text>
            }*/}
       </View>

      <View>
        <TouchableOpacity  style={styles.button} onPress={() => navigation.navigate("Uupdate1", {item1: email, item2:username,  item4:photo})}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity> 
       </View>
      </View>
     </LinearGradient>

     
    
  )
}

export default UserUpdate

const styles = StyleSheet.create({
container:{
  display:"flex",
  flexDirection:"column",
    flex:1,
    justifyContent: 'center',
    padding:20,
   
     height: '50%',   
},
contain:{
  marginTop: -100
},
input:{
   color:"white",
    margin: 12,
    borderColor:"white",
    fontWeight: "500",
  fontSize: 20,
paddingBottom:20,
},
button:{
  marginTop:60,
  backgroundColor: '#594677',
  width:"100%",
  padding: 15,
  borderRadius:10,
  alignItems:"center",
},
buttonText:{
  color: "#D1D0D0",
  fontWeight: "700",
  fontSize: 26,
  
},
  profilePictureContainer: {
    position: 'relative',
    marginBottom: 30
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 50,
    alignSelf:"center",
    marginBottom: 0
  },
  imageIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,ackgroundColor: 'transparent',
    zIndex: 1,
  },


})