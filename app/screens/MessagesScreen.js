import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'

import { Sse } from '../api/sse'
import {
  addNewChatMessage,
  getChatMessages,
  updateChatMessage,
} from '../api/message'
import { useErrorHandler } from '../hooks/use-error-handler'

import colors from '../styles/colors'
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native'

import Header from '../components/layout/Header'
import ActionsBar from '../components/ActionsBar'
import IconButton from '../components/buttons/IconButton'
import Message from '../components/Message'
import MessageInput from '../components/inputs/MessageInput'
import Spinner from '../components/Spinner'
import ChatMenu from '../components/menus/ChatMenu'

function MessagesScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const [showEditMessage, setShowEditMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [editMessage, setEditMessage] = useState({})
  const { chatId, chatName } = route.params
  const token = useSelector((state) => state.auth.token)
  const { handleError } = useErrorHandler()

  const handleGoBack = () => {
    navigation.goBack()
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleCloseEditMessage = () => {
    setShowEditMessage('')
    setEditMessage({})
  }
  const handleShowEditMessage = (messageId) => {
    setShowEditMessage(messageId)
  }

  const handleOpenEditMessage = (message) => {
    if (message) {
      setEditMessage(message)
    } else {
      setEditMessage({})
    }
  }

  const removeDeletedMessage = (messageId) => {
    setMessages((prevState) =>
      prevState.filter((message) => message._id !== messageId)
    )
  }

  const handleSendMessage = async (message) => {
    try {
      if (editMessage._id) {
        const updated = await updateChatMessage(
          message,
          chatId,
          editMessage._id,
          token
        )
        setMessages((prevState) => {
          return prevState.map((message) => {
            if (message._id === updated._id) return updated
            return message
          })
        })
        setEditMessage({})
        setShowEditMessage(false)
      } else {
        const newMessage = await addNewChatMessage(message, chatId, token)
        addNewMessage(newMessage)
      }
      return true
    } catch (error) {
      const alertBody = [
        'Could not send message',
        'An error occurred sending your message. Please reload the app and try again.',
        [{ text: 'Ok', style: 'cancel' }],
      ]
      handleError(error, alertBody)
      return false
    }
  }

  const fetchMessages = async () => {
    try {
      const data = await getChatMessages(chatId, token)
      setMessages(data.reverse())
    } catch (error) {
      const alertBody = [
        'Failed to fetch messages',
        'An error occurred fetching your messages. Please exit the chat and try again.',
        [{ text: 'Ok', style: 'cancel' }],
      ]
      handleError(error, alertBody)
    } finally {
      setIsLoading(false)
    }
  }

  const addNewMessage = (newMessage) => {
    setMessages((prevState) => {
      return [newMessage, ...prevState]
    })
  }

  useFocusEffect(
    useCallback(() => {
      fetchMessages()
      const stream = new Sse(`chat/${chatId}/messages`, token, addNewMessage)
      return () => {
        stream.cleanup()
      }
    }, [])
  )

  return (
    <Pressable style={styles.pageWrapper} onPress={handleCloseEditMessage}>
      <SafeAreaView style={styles.container}>
        <Header
          title={chatName}
          backNav={handleGoBack}
          bgColor={colors.success}
        >
          <ActionsBar>
            <IconButton
              name={'ellipsis-vertical'}
              onPress={toggleMenu}
              bgColor={colors.success}
            />
            {showMenu && (
              <ChatMenu
                chatId={chatId}
                onClose={toggleMenu}
                navigation={navigation}
              />
            )}
          </ActionsBar>
        </Header>
        <KeyboardAvoidingView
          style={styles.innerContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          {isLoading && <Spinner />}
          {messages.length > 0 && (
            <FlatList
              data={messages}
              keyExtractor={(item) => item._id}
              inverted
              style={styles.messageList}
              renderItem={({ item, index }) => (
                <Message
                  showEdit={showEditMessage === item._id}
                  setShowEdit={handleShowEditMessage}
                  onEdit={handleOpenEditMessage}
                  onDelete={removeDeletedMessage}
                  message={item}
                  isRepeatedAuthor={messages[index + 1]?.author._id === item.author._id}
                />
              )}
            />
          )}
          <MessageInput
            message={editMessage}
            onSubmit={handleSendMessage}
            placeholder={
              messages.length > 0 ? 'Reply...' : 'Type your message...'
            }
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Pressable>
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
    width: '100%',
  },
})

export default MessagesScreen
