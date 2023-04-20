import { TouchableOpacity,KeyboardAvoidingView, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import FooterNav from '../components/FooterNav'
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { selectUid, selectAmail } from '../components/authSlice';
import { doc, getDoc } from "firebase/firestore";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { getAuth, getUser, onAuthStateChanged } from 'firebase/auth';

const HomeScreen = ({ navigation }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('All');
   const [selectedEvent, setSelectedEvent] = useState('All');


  const uid = useSelector(selectUid);
  const email = useSelector(selectAmail);
  console.log(uid);
  console.log(email);

  useEffect(() => {
    const citiesRef = collection(db, "cities");

    const unsubscribe = onSnapshot(citiesRef, (snapshot) => {
      const newCities = [];
      snapshot.forEach(async (doc) => {
        const city = doc.data();
        const id = doc.id;
        newCities.push({ ...city, id });
      });
      setCities(newCities);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleEventSelection = (option) => {
    setSelectedOption(option);
  };




  const renderItem = ({ item }) => {
    
    if (selectedOption === 'All' || item.selectedOption === selectedOption) {
      return (
        <View key={item.id} >
          <Text style={styles.title}>{item.email}</Text>
          <Text style={styles.title}>{item.selectedOption}</Text>
          <Image source={{ uri: item.photo }} style={{ width: 450, height: 500 , }} />
          <View style={styles.info}>
            <Text style={styles.title1}>{item.topic}</Text>
            <Text style={styles.description}>{item.describe}</Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <LinearGradient colors={['rgba(66, 12, 88, 1.0)', 'rgba(66, 12, 88, 1)', 'rgba(33, 17, 52, 0.6)', 'rgba(89, 70, 119, 1)', 'rgba(33, 17, 52, 1.0)',]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container} behaviour="padding">
      <KeyboardAvoidingView >
        <View style={styles.event}>
        <TouchableOpacity style={[styles.events ,selectedOption==="All" && styles.selectedOption]} onPress={() => handleEventSelection('All')}>
            <Text style={styles.eventid}>All</Text>
          </TouchableOpacity>
          <View style={styles.evens}></View>
          
          <TouchableOpacity style={[ styles.events,selectedOption==="Accident" && styles.selectedOption]} onPress={() => handleEventSelection('Accident')}>
         <Text style={styles.eventid}>Accident</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.events,selectedOption==="Riot" && styles.selectedOption]} onPress={() => handleEventSelection('Riot')}>
          <Text style={styles.eventid} >Riot</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.events, selectedOption==="Fighting" && styles.selectedOption]} onPress={() => handleEventSelection('Fighting')}>
          <Text style={styles.eventid} >Fighting</Text>
         </TouchableOpacity>
     
      </View>
        <View style={styles.contain}>
        {loading ? (
          
          <Text>Loading data...</Text>
        ) : (

          
          <FlatList
            data={cities}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            
          />
        )}
      </View>
      </KeyboardAvoidingView>
      <FooterNav />
    </LinearGradient>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    padding: 20,
  },
  contain:{
   
   },
  event:{
   
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-evenly",
    borderBottomWidth:3,
    borderColor:"#D1D0D0",
    
  },
  events:{
    marginBottom:20,
     padding:10,
     borderWidth: 2,
     borderColor:"#D1D0D0",
  },
  evens:{
    borderRightWidth: 6,
    marginBottom:20,
    borderColor:"#D1D0D0",
  },
  eventid:{
    fontSize:25,
    color:"#D1D0D0",
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
    color: "#7B61FF"
  },
    title1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
    color: "#D1D0D0"
  },
  description: {
    fontSize: 24,
    marginBottom: 40,
    color:"white",
  },
  userId: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 2,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  info:{
    marginTop:7
  },
  selectedOption:{
     backgroundColor:  '#7B61FF',
     borderColor:"#7B61FF",
     borderRadius:10
   
  },

});
