import React, { useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store';

import { useInput } from '../../hooks/use-input'

import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateString,
  validateUsername,
} from '../../utils/validators'
import colors from '../../styles/colors'

import { StyleSheet, View } from 'react-native'
import CustomButton from '../CustomButton'
import { login } from '../../store/auth-slice'
import { useDispatch } from 'react-redux'
import { callGet, callPost } from '../../api/api'
import FormInput from './FormInput'
import ProgressBar from './ProgressBar'

function RegisterForm() {
  const dispatch = useDispatch()
  const fullNameInput = useInput(validateString)
  const usernameInput = useInput(validateUsername)
  const emailInput = useInput(validateEmail)
  const passwordInput = useInput(validatePassword)
  const passwordConfirmInput = useInput(
    validatePasswordConfirm.bind([], passwordInput.value)
  )
  const [formIsValid, setFormIsValid] = useState(false)
  const [stepIsValid, setStepIsValid] = useState(false)
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState(0)

  const steps = [
    [
      {
        input: fullNameInput,
        title: 'Name',
        validationError: 'Please provide a valid name.',
        type: 'fullName',
      },
      {
        input: emailInput,
        title: 'Email',
        validationError: 'Please provide a valid email address.',
        type: 'email',
      },
    ],
    [
      {
        input: usernameInput,
        title: 'Username',
        validationError:
          'Your username can be up to 20 characters long and may contain letters (a-z), digits, - and _',
        type: 'username',
        apiError: errors.username,
      },
    ],
    [
      {
        input: passwordInput,
        title: 'Password',
        validationError:
          'Your password must be between 6 and 20 characters long, contain uppercase and lowercase letters and at least one number.',
        type: 'password',
      },
      {
        input: passwordConfirmInput,
        title: 'Confirm password',
        validationError: 'Does not match the provided password.',
        type: 'password',
      },
    ],
  ]

  const handleRegister = async () => {
    if (!formIsValid) {
      return
    }
    const userData = {
      fullName: fullNameInput.value,
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    }
    try {
      const response = await callPost(userData, 'user')
      const token = response.data
      await SecureStore.setItemAsync('SNICK_SNACK_TOKEN', token)
      dispatch(login(token))
    } catch (error) {
      console.log(error)
    }
  }

  const validateUniqueUsername = async (username) => {
    try {
      const response = await callGet(`user/search/${username}`)
      const user = response.data
      if (user) {
        setErrors({ ...errors, username: 'This username is taken.' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (usernameInput.isValid) {
        validateUniqueUsername(usernameInput.value)
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [usernameInput.value])

  useEffect(() => {
    setStepIsValid(steps[step].every((field) => field.input.isValid))
  }, [
    fullNameInput.isValid,
    usernameInput.isValid,
    emailInput.isValid,
    passwordInput.isValid,
    passwordConfirmInput.isValid,
  ])

  useEffect(() => {
    setFormIsValid(
      fullNameInput.isValid &&
        usernameInput.isValid &&
        emailInput.isValid &&
        passwordInput.isValid &&
        passwordConfirmInput.isValid
    )
  }, [
    fullNameInput.isValid,
    usernameInput.isValid,
    emailInput.isValid,
    passwordInput.isValid,
    passwordConfirmInput.isValid,
  ])

  return (
    <View style={styles.container}>
      <ProgressBar steps={steps} currentStep={step} />
      <View style={styles.inputGroup}>
        {steps[step].map((inputProps, index) => {
          return <FormInput key={index} {...inputProps} />
        })}
      </View>
      {step < steps.length - 1 ? (
        <CustomButton
          title="Next"
          bgColor={colors.primary}
          disabled={!stepIsValid}
          onPress={() => setStep(step + 1)}
        />
      ) : (
        <CustomButton
          title="Register"
          bgColor={colors.danger}
          disabled={!formIsValid}
          onPress={handleRegister}
        />
      )}
      {step > 0 && (
        <CustomButton
          title="Back"
          bgColor={colors.secondary}
          onPress={() => setStep(step - 1)}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  inputGroup: {
    marginBottom: 10,
  },
})

export default RegisterForm
