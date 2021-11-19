import React from 'react'

import colors from '../styles/colors'
import { pageWrapper, subHeadingText } from '../styles/common'

import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native'
import LoginForm from '../components/forms/LoginForm'
import Header from '../components/Header'
import CustomButton from '../components/CustomButton'

function LoginScreen({ navigation }) {
  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleGoToRegister = () => {
    navigation.navigate('Register')
  }

  return (
    <SafeAreaView style={styles.pageWrapper}>
      <Header title="Login" backNav={handleGoBack} />
      <View style={styles.contentWrapper}>
        <KeyboardAvoidingView
          style={styles.formWrapper}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/snick-snack.png')}
            />
          </View>
          <LoginForm />
          <View style={styles.login}>
            <Text style={styles.loginText}>No account?</Text>
            <CustomButton
              title="Register"
              bgColor={colors.info}
              onPress={handleGoToRegister}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  pageWrapper: {
    ...pageWrapper,
    backgroundColor: colors.success,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  contentWrapper: {
    flex: 1,
    marginHorizontal: 30,
    alignItems: 'stretch',
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  loginText: {
    ...subHeadingText,
    padding: 5,
    textAlign: 'center',
  },
  login: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  logo: {
    width: 120,
    height: 120
  }
})

export default LoginScreen
