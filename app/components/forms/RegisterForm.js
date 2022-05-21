import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { addNewUser, getUserByUsername } from '../../api/user'
import { setStoreAuthToken } from '../../api/securestore'
import { useInput } from '../../hooks/use-input'
import { useErrorHandler } from '../../hooks/use-error-handler'
import { login, setIsLoading } from '../../store/auth-slice'

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
  const { alertError } = useErrorHandler()
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
      dispatch(setIsLoading(true))
      const token = await addNewUser(userData)
      await setStoreAuthToken(token)
      dispatch(login(token))
    } catch (error) {
      dispatch(setIsLoading(false))
      alertError()
    }
  }

  const validateUniqueUsername = async (username) => {
    try {
      const user = await getUserByUsername(username)
      if (user) {
        setErrors({ ...errors, username: 'This username is taken.' })
      }
    } catch (error) {
      alertError()
    }
  }
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (usernameInput.isValid) {
        validateUniqueUsername(usernameInput.value)
      }
    }, 500)

    setErrors((prevState) => {
      const temp = {...prevState}
      delete temp.username
      return temp
    })
    
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
          bgColor={colors.info}
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
    // ...formWrapper,
    // width: '100%'
  },
  formWrapper: {},
  inputGroup: {
    marginBottom: 10,
  },
})

export default RegisterForm
