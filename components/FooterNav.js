import React, { useState }  from 'react';
import {  TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FooterNav = () => {

const navigation = useNavigation();
const [selected, setSelected] = useState(false);
const [activeTab, setActiveTab] = useState("");

  const handlePress = (tabName) => {   setActiveTab(tabName); navigation.navigate(tabName)};
  
   
  return (
    <View style={styles.container}>
    <View style={styles.nav}>
     <TouchableOpacity onPress={() => handlePress('Home')} style={[styles.nav, activeTab==="Home" && styles.activeTab]}  >
     <Image source={require('../images/Home.png')} />
      <Text style={styles.text }>Home</Text>
      </TouchableOpacity>
     </View>

         <View style={styles.nav}>
     <TouchableOpacity onPress={() => handlePress('Discover')} style={[styles.nav, activeTab==="Discover" && styles.activeTab]}  >
     <Image source={require('../images/Discover.png')} />
      <Text style={styles.text }>Discover</Text>
      </TouchableOpacity>
     </View>

         <View style={styles.nav}>
     <TouchableOpacity onPress={() => handlePress('Post')} style={[styles.nav, activeTab==="Post" && styles.activeTab]}  >
     <Image source={require('../images/Create.png')} />
      <Text style={styles.text }>Post</Text>
      </TouchableOpacity>
     </View>

         <View style={styles.nav}>
     <TouchableOpacity onPress={() => handlePress('Search')}style={[styles.nav, activeTab==="Search" && styles.activeTab]}  >
     <Image source={require('../images/Search.png')} />
      <Text style={styles.text }>Search</Text>
      </TouchableOpacity>
     </View>

         <View style={styles.nav}>
     <TouchableOpacity onPress={() => handlePress('Uupdate')} style={[styles.nav, activeTab==="Uupdate" && styles.activeTab]}  >
     <Image source={require('../images/Profile.png')} />
      <Text style={styles.text }>Profile</Text>
      </TouchableOpacity>
     </View>
      
        {/*<View style={styles.nav}>
            <TouchableOpacity onPress={handlePress} style={styles.nav}>
     <Image source={require('../images/Discover.png')}   style={[styles.image,selected ? { tintColor: '#7B61FF' } : { tintColor: 'white' }, ]}/>
       <Text style={[styles.text ,selected ? { color: '#7B61FF' } : { color: 'white' }, ]}>Discover</Text>
       </TouchableOpacity>
     </View>

        <View style={styles.nav}>
     <Image source={require('../images/Create.png')} style={styles.image} onPress={() => navigation.navigate('Post')} />
          <Text style={styles.text} onPress={() => navigation.navigate('Post')}>Create</Text>
     </View>

        <View style={styles.nav}>
     <Image source={require('../images/Search.png')} style={styles.image} />
       <Text style={styles.text}>Search</Text>
     </View>

        <View style={styles.nav}>
     <Image source={require('../images/Profile.png')} style={styles.image} onPress={() => navigation.navigate('Uupdate')}/>
   <Text style={styles.text} onPress={() => navigation.navigate('Uupdate')}>Profile</Text>
     </View>*/}
    </View>
  );
};

export default FooterNav;

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'space-between',
    alignItems: 'center',
    display:"flex",
    flexDirection:"row",
    gap:50,
    padding:30,
    position:"absolute",
    bottom:0,
   
    
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  nav:{
    display:"flex",
    alignItems:"center"
  },
  activeTab:{
    backgroundColor:  '#7B61FF'
    //tintColor: '#7B61FF'
  },
  
 
});

