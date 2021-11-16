import React, { useEffect, useState } from 'react'

import { API_BASE_URL } from 'react-native-dotenv'

import { pageWrapper } from '../styles/common'

import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  View,
} from 'react-native'
import Message from '../components/Message'
import MessageInput from '../components/MessageInput'

function MessagesScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState(null)
  const { chatId } = route.params
  
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}chat/${chatId}/message`
      )
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <View style={styles.pageWrapper}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.innerContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          {isLoading && <Text style={{ padding: 50 }}>Loading...</Text>}
          {!isLoading && !messages && (
            <Text style={{ padding: 50 }}>Failed to fetch messages.</Text>
          )}
          {messages && (
            <FlatList
              data={messages}
              keyExtractor={(item) => item._id}
              inverted
              style={{ flex: 1, width: '100%' }}
              contentContainerStyle={{
                flexDirection: 'column-reverse',
              }}
              renderItem={({ item, index }) => (
                <Message
                  message={item}
                  isRepeatedAuthor={
                    index > 0
                      ? messages[index - 1].author._id === item.author._id
                      : false
                  }
                />
              )}
            />
          )}
          <MessageInput
            placeholder={
              messages && messages.length > 0 ? 'Reply...' : 'Your message...'
            }
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  pageWrapper: {
    ...pageWrapper,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  innerContainer: {
    flex: 1,
  },
})

export default MessagesScreen
