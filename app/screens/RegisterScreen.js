import React from 'react'

import colors from '../styles/colors'
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
import Header from '../components/Header'
import CustomButton from '../components/CustomButton'

function RegisterScreen({ navigation }) {
  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleGoToLogin = () => {
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.pageWrapper}>
      <Header title="Register" backNav={handleGoBack} />
      <View style={styles.contentWrapper}>
        <KeyboardAvoidingView
          style={styles.formWrapper}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <RegisterForm />
        <View style={styles.login}>
          <Text style={styles.loginText}>Already registered?</Text>
          <CustomButton
            title="Login"
            bgColor={colors.info}
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
  },
})

export default RegisterScreen
