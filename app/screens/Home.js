import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'

import { useSelector, useDispatch } from 'react-redux'
import { authenticateToken } from '../store/auth-slice'

import { View } from 'react-native'

function Home({ navigation }) {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth)
  const [checkedToken, setCheckedToken] = useState(false)
  const dispatch = useDispatch()

  const getToken = async () => {
    const token = await SecureStore.getItemAsync('SNICK_SNACK_TOKEN')
    if (token) {
      dispatch(authenticateToken(token))
    }
    setCheckedToken(true)
  }
  useEffect(() => {
    getToken()
  }, [])
  
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Chats')
    }
    if (!isAuthenticated && !isLoading && checkedToken) {
      navigation.navigate('Welcome')
    }
  }, [isAuthenticated, isLoading, checkedToken])

  return <View />
}

export default Home
