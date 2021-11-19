import React, { useEffect, useState } from 'react'

import { useInput } from '../../hooks/use-input'
import { validateEmail, validateString } from '../../utils/validators'

import colors from '../../styles/colors'
import { subHeadingText, textInput } from '../../styles/common'

import { TextInput, StyleSheet, View, Text } from 'react-native'
import CustomButton from '../CustomButton'
import { callPost } from '../../api/api'
import { login } from '../../store/auth-slice'
import { useDispatch } from 'react-redux'

function LoginForm(props) {
  const {
    value: emailInput,
    isValid: emailIsValid,
    hasError: emailHasError,
    onChange: emailOnChange,
    onBlur: emailOnBlur,
  } = useInput(validateEmail)
  const {
    value: passwordInput,
    isValid: passwordIsValid,
    onChange: passwordOnChange,
  } = useInput(validateString)

  const [formIsValid, setFormIsValid] = useState(false)
  const dispatch = useDispatch()

  const handleLogin = async () => {
    if (!formIsValid) {
      return
    }
    const userData = {
      email: emailInput,
      password: passwordInput,
    }
    try {
      const response = await callPost(userData, 'user/login')
      const token = response.data
      dispatch(login(token))
    } catch (error) {
      console.log('login:', error)
    }
  }

  useEffect(() => {
    setFormIsValid(emailIsValid && passwordIsValid)
  }, [emailIsValid, passwordIsValid])

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, emailHasError && styles.error]}
          value={emailInput}
          onChangeText={emailOnChange}
          onBlur={emailOnBlur}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailInput.hasError && (
          <View style={styles.errorMessageBox}>
            <Text style={[styles.text, styles.errorText]}>
              Please provide a valid email address.
            </Text>
          </View>
        )}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={passwordInput.value}
          secureTextEntry={true}
          onChangeText={passwordOnChange}
          placeholder="Password"
        />
      </View>
      <CustomButton
        title="Login"
        bgColor={colors.warning}
        disabled={!formIsValid}
        onPress={handleLogin}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    ...subHeadingText,
  },
  container: {
    flex: 3,
  },
  input: {
    ...textInput,
    borderRadius: 5,
  },
  inputGroup: {
    marginBottom: 10,
  },
  error: {
    borderWidth: 1,
    borderColor: colors.danger,
  },
  errorMessageBox: {
    marginHorizontal: 0,
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.info,
    borderRadius: 20,
  },
})

export default LoginForm
