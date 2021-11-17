import React, { useState } from 'react'

import { API_BASE_URL } from 'react-native-dotenv'

import colors from '../styles/colors'
import theme from '../styles/theme'

import { Text, TextInput, View, StyleSheet, Switch } from 'react-native'
import CustomButton from './CustomButton'
import { headingText, textInput } from '../styles/common'

function ChatForm({ onSubmit, onClose }) {
  const [titleInput, setTitleInput] = useState('')
  const [descriptionInput, setDescriptionInput] = useState('')
  const [isPrivate, setIsPrivate] = useState('')

  const handleTitleChange = (text) => {
    setTitleInput(text)
  }

  const handleDescriptionChange = (text) => {
    setDescriptionInput(text)
  }

  const toggleIsPrivate = () => {
    setIsPrivate(!isPrivate)
  }

  const handleSubmitChat = async () => {
    if (titleInput.trim().length <= 0) {
      return
    }
    const chatData = {
      title: titleInput,
      description: descriptionInput,
      private: false,
    }
    try {
      const response = await fetch(`${API_BASE_URL}chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatData),
      })
      const newChat = await response.json()

      onSubmit(newChat)
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.formWrapper}>
      <Text style={styles.title}>Create a new chat</Text>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Chat name"
          style={styles.input}
          value={titleInput}
          onChangeText={handleTitleChange}
        />
        <TextInput
          placeholder="Description"
          style={styles.input}
          value={descriptionInput}
          onChangeText={handleDescriptionChange}
        />
        <View style={styles.container}>
          <Text>Make this chat private</Text>
          <Text>Users can only join via invite.</Text>
          <Switch
            trackColor={{
              false: colors.secondaryExtraLight,
              true: colors.info,
            }}
            thumbColor={isPrivate ? colors.danger : colors.primaryDark}
            ios_backgroundColor={colors.secondaryExtraLight}
            onValueChange={toggleIsPrivate}
            value={isPrivate}
          />
          <Text style={[styles.privacy, isPrivate && styles.private]}>
            {isPrivate ? 'Private chat' : 'Open chat'}
          </Text>
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <CustomButton
          title="Create chat"
          onPress={handleSubmitChat}
          bgColor={colors.submit}
        />
        <CustomButton
          title="Cancel"
          onPress={onClose}
          bgColor={colors.cancel}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonGroup: {
    marginTop: 5,
  },
  formWrapper: {
    width: '85%',
    backgroundColor: colors.secondaryExtraLight,
    borderRadius: 50,
    padding: 25,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  input: {
    ...textInput,
  },
  inputGroup: {
    marginVertical: 15,
  },
  title: {
    textAlign: 'center',
    ...headingText,
  },
  privacy: {
    fontSize: theme.FONT_SIZE_LARGE,
  },
  private: {
    color: colors.secondaryMedium,
  },
})

export default ChatForm
