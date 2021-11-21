import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native'
import ChatForm from '../components/forms/ChatForm'
import { pageWrapper } from '../styles/common'
import theme from '../styles/theme'

function EditScreen({ route, navigation }) {
  const { type, prop } = route.params

  const handleGoBack = () => {
    navigation.goBack()
  }

  let output

  switch (type) {
    case 'chat': {
      output = (
        <ChatForm
          chatId={prop}
          onClose={handleGoBack}
        />
      )
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.pageWrapper}
    >
      <SafeAreaView style={styles.container}>{output}</SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  pageWrapper: {
    ...pageWrapper,
    paddingTop: Platform.OS === 'andoid' ? StatusBar.currentHeight : 0,
    backgroundColor: theme.BACKGROUND_COLOR_LIGHT,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default EditScreen
