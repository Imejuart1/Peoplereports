import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FooterNav from '../components/FooterNav'
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({navigation}) => {

  return (
    <LinearGradient colors={['#420C58',  '#211134', '#594677']} style={styles.container} behaviour="padding">
    <KeyboardAvoidingView>
    <View>
      <Text>HomeScreen</Text>
          
    </View>
    <FooterNav/>
    </KeyboardAvoidingView>
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