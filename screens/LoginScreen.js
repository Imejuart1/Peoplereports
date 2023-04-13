import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { setUid } from '../components/authSlice';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("")
  const [password,  setPassword] = useState("")


 const dispatch = useDispatch();



 

    {/*  useEffect(() => {

    const auth = getAuth();
onAuthStateChanged(auth, (user) => {
 if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
     navigation.navigate("RegisterScreen", {uid})
    
    // ...
  } else {
    console.log("User is signed out")

  }
});
   
  }, []
)*/}

    const handleLogin = () => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user.email);
    console.log(user.uid)
    const uid = user.uid;
    dispatch(setUid(uid));
    // ...
  })
 .catch(error =>  alert(error.message))
    }

    const SignUp = () =>{
      navigation.navigate("RegisterScreen")
    }
  return (
    
    
         <LinearGradient colors={['#420C58',  '#211134', '#594677']} 

         style={styles.container} behaviour="padding">
         <KeyboardAvoidingView>

      <View style={styles.contain}>
               <View style={styles.head}>
      <Text style={styles.header} >Sign into</Text>
      <Text style={styles.header} >your account</Text>
      </View>

      <View>
        <TextInput placeholder='Username/Email' 
        placeholderTextColor="white"
        value={email} 
        onChangeText={text => setEmail(text)} 
        style={styles.input}
         
        />
       </View>

       <View>
       <TextInput placeholder='Password' 
        placeholderTextColor="white"
        value={password} 
        onChangeText={text => setPassword(text)} 
        style={styles.input}
        secureTextEntry
        />
        </View>

      {/*</View>*/}

      {/*<View style={styles.buttonContainer}>*/}
      <View>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity> 
       </View>

  
      </View>

    
      </KeyboardAvoidingView>
                  <View style={styles.sign}>
        
        <Text style={styles.signinfo}>Don't have an account?</Text>
          <Text style={styles.buttonTet} onPress={SignUp}>Sign Up</Text>
          
       </View>
     </LinearGradient>

     
    
  )
}

export default LoginScreen

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
header:{
 
  color: "#D1D0D0",
  fontWeight: "800",
  fontSize: 32,
  //font: "Manrope"
},
head:{
  width:"52%",
  alignSelf:"flex-start",
  marginBottom: 60,
},
input:{
   
    margin: 12,
    //borderWidth: 1,
    borderBottomWidth:1,
    borderColor:"#D1D0D0",
    fontWeight: "500",
  fontSize: 20,
paddingBottom:20,
color:"white",
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
  fontSize: 16,
  
},
sign:{
    position:'absolute',
    bottom:0,
    padding: 20,
    display:"flex",
    flexDirection:"row",
    gap:10
    
},
signinfo:{
  color:"#D1D0D0",
  fontSize: 22,
  fontWeight: 400,
},
buttonTet:{
  color:"#420C58",
  fontSize: 22,
  fontWeight: 400,
}
})



{/*
inputcontainer:{
  display:"flex",
  flexDirection:"column",
   //width: "80%",
   alignItems: "center"
},

input:{
backgroundColor: "white",
paddingHorizontal: 35,
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
},*/}