import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useContext }  from 'react'
import FooterNav from '../components/FooterNav'
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { selectUid } from '../components/authSlice';

const HomeScreen = ({navigation}) => {
  const uid = useSelector(selectUid);
  console.log(uid)
  return (
    <LinearGradient colors={['#420C58',  '#211134', '#594677']} style={styles.container} behaviour="padding">
    <KeyboardAvoidingView>
    <View>
      <Text>HomeScreen</Text>
          
    </View>
    
    </KeyboardAvoidingView>
   
    <FooterNav/>

    </LinearGradient>
  )
}



export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
  
    padding:20, 
},

})