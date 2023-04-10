import { StyleSheet, Text, View } from 'react-native'
import React from 'react'



const HomeScreen = ({navigation}) => {
      const handleLogin = () => {
        navigation.navigate("Post")
    }

  return (
    <View>
      <Text>HomeScreen</Text>
       
          <Text style={styles.buttonText} onPress={handleLogin}>Login</Text>
       
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})