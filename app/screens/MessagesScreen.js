import React, { useEffect, useState } from 'react'

import { API_BASE_URL } from 'react-native-dotenv'

import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import Message from '../components/Message'
import MessageInput from '../components/MessageInput'

function MessagesScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState(null)
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}chat/618ba08c5a6c805cca763e71/message`
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        {isLoading ? (
          <Text style={{ padding: 50 }}>Loading...</Text>
        ) : (
          <FlatList
            data={messages}
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
            keyExtractor={(item) => item._id}
          />
        )}
        <MessageInput
          placeholder={
            messages && messages.length > 0 ? 'Reply...' : 'Your message...'
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  innerContainer: {
    flex: 1,
  },
})

export default MessagesScreen
