import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'

function Home({navigation}) {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Chats')
    }
    if (!isAuthenticated && !isLoading) {
      navigation.navigate('Welcome')
    }
  }, [isAuthenticated, isLoading])
  
  return <View />
}

export default Home
