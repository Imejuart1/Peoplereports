import { KeyboardAvoidingView, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import FooterNav from '../components/FooterNav'
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { selectUid , selectAmail} from '../components/authSlice';
import { doc, getDoc } from "firebase/firestore";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { getAuth, getUser, onAuthStateChanged } from 'firebase/auth';

const HomeScreen = ({ navigation }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const uid = useSelector(selectUid);
  const email = useSelector(selectAmail);
  console.log(uid);
  console.log(email);

  
  useEffect(() => {
    const citiesRef = collection(db, "cities");
    
    const unsubscribe = onSnapshot(citiesRef, (snapshot) => {
      const newCities = [];
      snapshot.forEach( async (doc) => {
        const city = doc.data();
        const id = doc.id;
        newCities.push({ ...city, id,  });
      });
      setCities(newCities);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const renderItem = ({ item }) => (
    <View key={item.id}>
    <Text style={styles.title}>{item.email}</Text>
      <Text style={styles.title}>{item.topic}</Text>
      <Text style={styles.description}>{item.describe}</Text>
      <Text style={styles.userId}>User ID: {item.id}</Text>
      <Image source={{ uri: item.photo }} style={{ width: 450, height: 500 }} />
 
    </View>
  );

  return (
    <LinearGradient colors={['#420C58', '#211134', '#594677']} style={styles.container} behaviour="padding">
      <KeyboardAvoidingView>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    marginBottom: 5,
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
});
