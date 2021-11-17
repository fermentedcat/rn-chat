import React from 'react'
import {
  Image,
  StyleSheet,
  View,
} from 'react-native'
import CustomButton from '../components/CustomButton'
import colors from '../styles/colors'

import { pageWrapper, headingText } from '../styles/common'


function WelcomeScreen({ navigation }) {
  const handleLogin = () => {
    navigation.navigate('Chats')
  }
  
  const handleRegister = () => {
    console.log('register')
  }
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/snick-snack.png')}
        />
      </View>
      <View style={{ width: '70%' }}>
        <CustomButton
          title="Login"
          onPress={handleLogin}
          bgColor={colors.submit}
        />
        <CustomButton
          title="Register"
          onPress={handleRegister}
          bgColor={colors.option}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...pageWrapper,
    alignItems: 'center',
  },
  heading: {
    ...headingText,
  },
  logoContainer: {
    marginTop: 80,
    marginBottom: 50,
  },
  logo: {
    width: 300,
    height: 300,
  },
})

export default WelcomeScreen
