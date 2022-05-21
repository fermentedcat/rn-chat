import React from 'react'
import { useSelector } from 'react-redux'

import colors from '../styles/colors'
import theme from '../styles/theme'
import { pageWrapper, subHeadingText } from '../styles/common'

import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Text,
  Platform,
} from 'react-native'
import RegisterForm from '../components/forms/RegisterForm'
import Header from '../components/layout/Header'
import Spinner from '../components/Spinner'
import Button from '../components/buttons/Button'

function RegisterScreen({ navigation }) {
  const { isLoading } = useSelector((state) => state.auth)

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleGoToLogin = () => {
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.pageWrapper}>
      <Header
        title="Register"
        backNav={handleGoBack}
        bgColor={theme.BACKGROUND_COLOR_LIGHT}
      />
      <View style={styles.contentWrapper}>
        <KeyboardAvoidingView
          style={styles.formWrapper}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          {isLoading && <Spinner />}
          <RegisterForm />
          <View style={styles.login}>
            <Text style={styles.loginText}>Already registered?</Text>
            <Button
              title="Login"
              bgColor={colors.primary}
              onPress={handleGoToLogin}
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
})

export default RegisterScreen
