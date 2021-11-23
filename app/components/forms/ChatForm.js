import React, { useEffect, useState } from 'react'

import colors from '../../styles/colors'

import { Text, TextInput, View, StyleSheet, Switch } from 'react-native'
import CustomButton from '../CustomButton'
import { formWrapper, headingText, subHeadingText, textInput } from '../../styles/common'
import { useInput } from '../../hooks/use-input'
import { validateString } from '../../utils/validators'
import { callGet, callPost } from '../../api/api'
import { useSelector } from 'react-redux'

function ChatForm({ onSubmit, onClose, chatId }) {
  const [chat, setChat] = useState(null)
  const {
    value: titleInput,
    isValid: titleIsValid,
    hasError: titleHasError,
    onChange: titleOnChange,
    onBlur: titleOnBlur,
  } = useInput(validateString)

  const { value: descriptionInput, onChange: descriptionOnChange } = useInput()

  const [isPrivate, setIsPrivate] = useState(false)
  const token = useSelector((state) => state.auth.token)

  const toggleIsPrivate = () => {
    setIsPrivate(!isPrivate)
  }

  const handleSubmitChat = async () => {
    if (!titleIsValid) {
      return
    }
    const chatData = {
      title: titleInput,
      description: descriptionInput,
      private: isPrivate,
    }
    try {
      if (!chatId) {
        const response = await callPost(chatData, 'chat', token)
        const newChat = response.data
        onSubmit(newChat)
      } else {
        await callPost(chatData, `chat/${chatId}`, token)
      }
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  const getChat = async () => {
    try {
      const response = await callGet(`chat/${chatId}`, token)
      const data = response.data
      console.log(data)
      setChat(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (chat) {
      titleOnChange(chat.title)
      descriptionOnChange(chat.description)
      setIsPrivate(chat.private)
    }
  }, [chat])

  useEffect(() => {
    if (chatId) {
      getChat()
    }
  }, [chatId])

  return (
    <View style={styles.formWrapper}>
      <Text style={styles.title}>{!chatId ? 'Create a new chat' : 'Edit chat'}</Text>
      <View style={styles.inputGroup}>
      <Text style={styles.label}>Title</Text>
        
        <TextInput
          placeholder="Chat title*"
          style={[styles.input, titleHasError && styles.errorInput]}
          value={titleInput}
          onChangeText={titleOnChange}
          onBlur={titleOnBlur}
        />
        {titleHasError && (
          <Text style={[styles.text, styles.errorText]}>
            Title is required.
          </Text>
        )}
      <Text style={styles.label}>Description</Text>

        <TextInput
          placeholder="Description"
          style={styles.input}
          value={descriptionInput}
          onChangeText={descriptionOnChange}
        />
      </View>
      <Text style={styles.label}>
        Make this chat private
      </Text>
      <View style={styles.privacyWrapper}>
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
        <Text style={[styles.text, styles.switchDescription]}>
          {isPrivate ? 'Users can only join via invite.' : 'Anyone can join the chat.'}
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        <CustomButton
          title={!chatId ? 'Create chat' : 'Save'}
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
    ...formWrapper
  },
  errorInput: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    paddingHorizontal: 10,
    paddingBottom: 5,
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
  label: {
    paddingHorizontal: 5,
    ...subHeadingText,
  },
  switchDescription: {
    paddingLeft: 10,
    color: colors.secondaryMedium,
  },
  privacyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
})

export default ChatForm
