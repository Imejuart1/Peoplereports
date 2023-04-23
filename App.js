import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword , onAuthStateChanged, signOut} from "firebase/auth";
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import PostScreen2 from './screens/Postscreen2';
import UserUpdate from './screens/UserUpdate';
import FooterNav from './components/FooterNav';
import Discovers from './screens/Discover';
import Search from './screens/Search';
import { Provider } from 'react-redux';
import store from './components/store';

const StartStack = createNativeStackNavigator();
const EndStack = createNativeStackNavigator();
const auth = getAuth();
const Tab = createBottomTabNavigator();

 const handleLogout = () => {
    signOut(auth);
  };
function HomeStackScreen() {
  return (
    <StartStack.Navigator>
<StartStack.Screen   options={({ navigation }) => ({headerStyle: { backgroundColor: '#420C58'},headerShown: true,
         headerTintColor: 'white',  headerRight: () => (
              <Button
                onPress={handleLogout}
                title="Logout"
              />
            )})} name="Home" component={HomeScreen} />
        <StartStack.Screen options={({ navigation }) => ({headerStyle: { backgroundColor: '#420C58'},headerShown: true,
         headerTintColor: 'white', headerTitleAlign: 'center',headerTitleStyle: { fontSize: 24 },})} name="Post" component={PostScreen} />
        <StartStack.Screen options={({ navigation }) => ({headerStyle: { backgroundColor: '#420C58'},headerShown: true,
         headerTintColor: 'white', headerTitleAlign: 'center',headerTitleStyle: { fontSize: 24 },})} name="Post2" component={PostScreen2} />
       <StartStack.Screen options={({ navigation }) => ({headerStyle: { backgroundColor: '#420C58'},headerShown: true,
         headerTintColor: 'white', headerTitleAlign: 'center',headerTitleStyle: { fontSize: 24 },})} name="Uupdate" component={UserUpdate} />
       <StartStack.Screen options={{headerShown: false}} name="Search" component={Search} />
       <StartStack.Screen options={{headerShown: false}} name="Discover" component={Discovers} />
       </StartStack.Navigator>
  );
}



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
    setIsLoggedIn(false);
  }
});
  }, []
)
 const [isNewUser, setIsNewUser] = useState(false);
 const handleRegister = () => {
  setIsNewUser(true);
};
  return (
     <Provider store={store}>
           <NavigationContainer>
          

      {isLoggedIn ? (
        <>
        <Tab.Navigator tabBar={(props) => <FooterNav {...props} />}>
        <Tab.Screen name="Home" options={{headerShown: false}} component={HomeStackScreen} />
        </Tab.Navigator>
      
      </>
      ) : (
        <StartStack.Navigator>
        {!isLoggedIn &&<StartStack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />}
         {!isLoggedIn && <StartStack.Screen options={{headerShown: false }} initialParams={{ handleRegister }} name="RegisterScreen" component={RegisterScreen}/>}
        
       </StartStack.Navigator>
       
      )}
      
   
    
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
