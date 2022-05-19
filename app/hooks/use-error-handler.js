import { useDispatch } from "react-redux"
import { logout } from "../store/auth-slice"
import { Alert } from "react-native"

export const useErrorHandler = () => {

  const dispatch = useDispatch()

  const alertError = (alertBody) => {
    const body = alertBody || ['Error', 'An error occurred. Please reload the app and try again.', [
      { text: 'Ok', style: 'cancel' }
    ]]
    Alert.alert(...body)
  }

  const handleLoginError = (error) => {
    if (error.response.status === 401) {
      Alert.alert('Login failed', 'Email and password do not match.', [
        { text: 'Ok', style: 'cancel' }
      ])
      return
    }
    alertError()
  }
  
  const handleError = (error, alertBody) => {
    if (error.response.status === 401) {
      Alert.alert('You were logged out', 'Please log in again.', [
        { text: 'Ok', onPress: () => dispatch(logout()) }
      ])
      return
    }
    alertError(alertBody)
  }



  return {
    alertError,
    handleError,
    handleLoginError,
  }
}