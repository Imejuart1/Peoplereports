import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import UserUpdate from './screens/UserUpdate';
import FooterNav from './components/FooterNav';
import Discovers from './screens/Discover';
import Search from './screens/Search';
import { Provider } from 'react-redux';
import store from './components/store';

const StartStack = createNativeStackNavigator();
const EndStack = createNativeStackNavigator();
const auth = getAuth();

export default function App() {

 const [isLoggedIn, setIsLoggedIn] = useState(false);

      useEffect(() => {

    const auth = getAuth();
onAuthStateChanged(auth, (user) => {
 if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    setIsLoggedIn(true);
    // ...
  } else {
    console.log("User is signed out")

  }
});
   
  }, []
)

  return (
     <Provider store={store}>
           <NavigationContainer>
     <StartStack.Navigator>

    
      {isLoggedIn ? (
        <>
        
        <StartStack.Screen name="Home" component={HomeScreen} />
        <StartStack.Screen name="Post" component={PostScreen} />
       <StartStack.Screen name="Uupdate" component={UserUpdate} />
       <StartStack.Screen name="Search" component={Search} />
       <StartStack.Screen name="Discover" component={Discovers} />
       
      </>
      ) : (
        <>
        <StartStack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <StartStack.Screen options={{headerShown: false}} name="RegisterScreen" component={RegisterScreen}/>
       </>
       
      )}
     </StartStack.Navigator>
    </NavigationContainer>
    </Provider>
  

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
