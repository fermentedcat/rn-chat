import React, { useEffect, useState } from 'react'

import { API_BASE_URL } from 'react-native-dotenv'

import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import colors from '../styles/colors'
import ChatButton from '../components/ChatButton'
import ActionsBar from '../components/ActionsBar'
import IconButton from '../components/IconButton'
import Header from '../components/Header'

function ChatsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const [subscriptions, setSubscriptions] = useState(null)
  const userId = '618b9ea2ce54c1bbb202217d'

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}user/${userId}/subscription`)
      const data = await response.json()
      setSubscriptions(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  return (
    <View style={styles.pageWrapper}>
      <SafeAreaView style={styles.container}>
        <Header title="Chats" logo>
          <ActionsBar>
            <IconButton name="search" />
            <IconButton name="ellipsis-vertical" />
          </ActionsBar>
        </Header>
        {isLoading && <Text>Loading...</Text>}
        {subscriptions && (
          <FlatList
            data={subscriptions}
            keyExtractor={(item) => item._id}
            style={styles.chatList}
            renderItem={({ item }) => <ChatButton chat={item.chat} navigation={navigation} />}
          />
        )}
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: colors.secondaryMedium,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  chatList: {
    backgroundColor: colors.secondaryExtraLight,
  },
})

export default ChatsScreen
