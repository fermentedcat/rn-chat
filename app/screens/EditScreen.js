import React from 'react'

import theme from '../styles/theme'
import { pageWrapper } from '../styles/common'

import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native'
import ChatForm from '../components/forms/ChatForm'
import ChatInviteForm from '../components/forms/ChatInviteForm'

function EditScreen({ route, navigation }) {
  const { type, prop } = route.params

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleGoToChats = () => {
    navigation.navigate('Chats')
  }

  const handleGoToMessages = (chat) => {
    navigation.navigate('Messages', { chatId: chat._id, chatName: chat.title })
  }

  let output

  switch (type) {
    case 'chat': {
      output = (
        <ChatForm
          chatId={prop}
          onDelete={handleGoToChats}
          onSubmit={handleGoToMessages}
          onClose={handleGoBack}
        />
      )
      break
    }
    case 'invite': {
      output = <ChatInviteForm chatId={prop} onClose={handleGoBack} />
      break
    }
    default:
      break
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.pageWrapper}
    >
      <SafeAreaView style={styles.container}>{output && output}</SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  pageWrapper: {
    ...pageWrapper,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: theme.BACKGROUND_COLOR_LIGHT,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default EditScreen
