import React from 'react'
import {
  Image,
  StyleSheet,
  View,
} from 'react-native'
import CustomButton from '../components/CustomButton'
import colors from '../styles/colors'

import { wrapper, headingText } from '../styles/common'

const handleLogin = () => {
  console.log('login')
}

const handleRegister = () => {
  console.log('register')
}

function WelcomeScreen(props) {
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
          handlePress={handleLogin}
          bgColor={colors.info}
          rippleColor={colors.infoDark}
        />
        <CustomButton
          title="Register"
          handlePress={handleRegister}
          bgColor={colors.primary}
          rippleColor={colors.primaryDark}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...wrapper,
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
