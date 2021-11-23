import React, { useEffect, useState } from 'react'

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
import ChatMenu from '../components/ChatMenu'

function MessagesScreen({ route, navigation }) {
  const initialError = {
    type: null,
    message: null,
  }
  const [error, setError] = useState(initialError)
  const [isLoading, setIsLoading] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const [messages, setMessages] = useState([])
  const { chatId, chatName } = route.params
  const endpoint = `chat/${chatId}/message`
  const token = useSelector((state) => state.auth.token)

  const handleGoBack = () => {
    navigation.goBack()
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu)
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
      setError({ type: 'danger', message: 'Failed to fetch messages.'})
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
        <Header title={chatName} backNav={handleGoBack} bgColor={colors.success}>
          <ActionsBar>
            <IconButton name={'ellipsis-vertical'} onPress={toggleMenu} bgColor={colors.success}/>
            {showMenu && <ChatMenu chatId={chatId} onClose={toggleMenu} navigation={navigation}/>}
          </ActionsBar>
        </Header>
        <KeyboardAvoidingView
          style={styles.innerContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          {isLoading && <Spinner />}
          {error.message && (
            <Text style={{ padding: 50 }}>{error.message}</Text>
          )}
          {messages.length > 0 && (
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
              messages.length > 0 ? 'Reply...' : 'Type your message...'
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
    backgroundColor: colors.success,
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
