import React from 'react'
import { useSelector } from 'react-redux'

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
import Header from '../components/layout/Header'
import Button from '../components/buttons/Button'
import Spinner from '../components/Spinner'
import theme from '../styles/theme'

function LoginScreen({ navigation }) {
  const { isLoading } = useSelector((state) => state.auth)

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleGoToRegister = () => {
    navigation.navigate('Register')
  }

  return (
    <SafeAreaView style={styles.pageWrapper}>
      <Header
        title="Login"
        backNav={handleGoBack}
        bgColor={theme.BACKGROUND_COLOR_LIGHT}
      />
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
          {isLoading && <Spinner />}
          <LoginForm />
          <View style={styles.login}>
            <Text style={styles.loginText}>No account?</Text>
            <Button
              title="Register"
              bgColor={colors.danger}
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR_LIGHT,
    paddingHorizontal: 30,
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
    height: 120,
  },
})

export default LoginScreen
