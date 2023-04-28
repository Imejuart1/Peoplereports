import { ScrollView, Button, TouchableOpacity,KeyboardAvoidingView, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import FooterNav from '../components/FooterNav'
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { selectUid, selectAmail, selectLoggedIn } from '../components/authSlice';
import { doc, getDoc } from "firebase/firestore";
import { getFirestore, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from '../firebase';
import { formatDistanceToNow } from 'date-fns';


const HomeScreen = ({ navigation }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('All')

  const uid = useSelector(selectUid);
  const email = useSelector(selectAmail);
  console.log(uid);
  

  useEffect(() => {
    const citiesRef = query(collection(db, "cities"), orderBy("timeStamp", "desc"));;

    const unsubscribe = onSnapshot(citiesRef, (snapshot) => {
      const newCities = [];
      snapshot.forEach(async (doc) => {
        const city = doc.data();
        const id = doc.id;
         // Calculate the time elapsed since the post was created
      const timeElapsed = formatDistanceToNow(city.timeStamp.toDate(), { addSuffix: true });
      
        newCities.push({ ...city, id, timeElapsed });
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
        <View key={item.id} style={{ flex: 0 }}>
        <View>
        <View style={styles.topgrid}>
        <View style={styles.brofile}>
         <Image source={{ uri: item.hoto }} style={styles.profilePicture} />
          <Text style={styles.title}>{item.username}</Text>
          </View>
          <Text style={styles.title}>{item.selectedOption}</Text>
          </View>
           <View style={styles.location} >
           {item.locationData.region&& item.locationData.subregion ?
          (<Text style={styles.title}>{item.locationData.region},{item.locationData.subregion}</Text>)
          :
          (<Text style={styles.title}>{item.locationData}</Text>)
          }
          </View>
          </View>
          <Image source={{ uri: item.photo }} style={{ width: 450, height: 480 , }} />
          <Text style={styles.time}>{item.timeElapsed}</Text>
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
   <LinearGradient colors={['#420C58',  '#211134', '#594677']}  style={styles.container} behaviour="padding">
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
     
        {loading ? (
          
          <Text>Loading data...</Text>
        ) : (   
          <FlatList
            data={cities}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}

      
      </KeyboardAvoidingView>
      
    </LinearGradient>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  safeAreaView:{
    
   },
  event:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-evenly",
    borderBottomWidth:3,
    borderColor:"#D1D0D0",
    
  },
  events:{
    marginBottom:10,
     padding:10,
     borderWidth: 2,
     borderColor:"#D1D0D0",
  },
  evens:{
    borderRightWidth: 6,
    marginBottom:10,
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
    marginTop:-10,
    marginBottom:10,
  },
  selectedOption:{
     backgroundColor:  '#7B61FF',
     borderColor:"#7B61FF",
     borderRadius:10
   
  },
    profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 50,
  
  },
  brofile:{
    display:"flex",
    flexDirection:"row",
    gap: 10,
    alignitems: 'center',
  },
  location:{
    alignItems:'flex-end'
  },
  topgrid:{
    marginBottom:-30
  },
  time:{
    color: "#D1D0D0",
    fontWeight:"bold",
    alignSelf:"flex-end"
  },
});
