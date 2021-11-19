import React, { useEffect, useState } from 'react'

import { API_BASE_URL } from 'react-native-dotenv'

import { pageWrapper } from '../styles/common'

import colors from '../styles/colors'

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

import Header from '../components/Header'
import ActionsBar from '../components/ActionsBar'
import IconButton from '../components/IconButton'
import Message from '../components/Message'
import MessageInput from '../components/MessageInput'
import Spinner from '../components/Spinner'
import { callGet, callPost } from '../api/api'
import { useSelector } from 'react-redux'

function MessagesScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState(null)
  const { chatId, chatName } = route.params
  const endpoint = `chat/${chatId}/message`
  const token = useSelector((state) => state.auth.token)

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleSendMessage = async (message) => {
    try {
      const response = await callPost(message, endpoint, token)
      const newMessage = response.data
      setMessages((prevState) => {
        return [...prevState, newMessage]
      })
      return ''
    } catch (error) {
      console.log(error)
      return message
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await callGet(endpoint, token)
      const data = response.data
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
        <Header title={chatName} backNav={handleGoBack}>
          <ActionsBar>
            <IconButton name={'ellipsis-vertical'} />
          </ActionsBar>
        </Header>
        <KeyboardAvoidingView
          style={styles.innerContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          {isLoading && <Spinner />}
          {!isLoading && !messages && (
            <Text style={{ padding: 50 }}>Failed to fetch messages.</Text>
          )}
          {messages && (
            <FlatList
              data={messages}
              keyExtractor={(item) => item._id}
              inverted
              style={styles.messageList}
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
            onSubmit={handleSendMessage}
            placeholder={
              messages && messages.length > 0 ? 'Reply...' : 'Type your message...'
            }
          />
        </KeyboardAvoidingView>
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
  innerContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-end',
  },
  messageList: { 
    flex: 1, 
    width: '100%' 
  },
})

export default MessagesScreen
