import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { addNewChat, deleteChat, getChatById, updateChat } from '../../api/chat'
import { useInput } from '../../hooks/use-input'
import { useErrorHandler } from '../../hooks/use-error-handler'
import { validateString } from '../../utils/validators'
import colors from '../../styles/colors'
import {
  formWrapper,
  headingText,
  subHeadingText,
  textInput,
} from '../../styles/common'

import { Text, TextInput, View, StyleSheet, Switch, Alert } from 'react-native'
import Button from '../buttons/Button'
import IconButton from '../buttons/IconButton'

function ChatForm({ chatId, onSubmit, onClose, onDelete }) {
  const [chat, setChat] = useState(null)
  const {
    value: titleInput,
    isValid: titleIsValid,
    hasError: titleHasError,
    onChange: titleOnChange,
    onBlur: titleOnBlur,
  } = useInput(validateString)

  const { value: descriptionInput, onChange: descriptionOnChange } = useInput()
  const { handleError } = useErrorHandler()

  const [isPrivate, setIsPrivate] = useState(false)
  const token = useSelector((state) => state.auth.token)

  const toggleIsPrivate = () => {
    setIsPrivate(!isPrivate)
  }

  const handlePressDelete = () => {
    Alert.alert('Delete chat', 'Are you sure?', [
      { text: 'Yes', onPress:  handleDeleteChat },
      { text: 'No', style: 'cancel' }
    ])
  }

  const handleDeleteChat = async () => {
    try {
      await deleteChat(chatId, token)
      onDelete()
    } catch (error) {
      const errorMessage =
        error.response?.status === 500
          ? 'You are not authorized to delete this chat.'
          : 'Unable to delete chat'
      const alertBody = [
        'Error',
        errorMessage,
        [{ text: 'Ok', style: 'cancel' }],
      ]
      handleError(error, alertBody)
    }
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
        const newChat = await addNewChat(chatData, token)
        onSubmit(newChat)
        onClose()
      } else {
        const updated = await updateChat(chatData, chatId, token)
        onSubmit(updated)
      }
    } catch (error) {
      handleError(error)
    }
  }

  const getChat = async () => {
    try {
      const data = await getChatById(chatId, token)
      setChat(data)
    } catch (error) {
      handleError(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (chat) {
        titleOnChange(chat.title)
        descriptionOnChange(chat.description)
        setIsPrivate(chat.private)
      }
    }, [chat])
  )
  useFocusEffect(
    useCallback(() => {
      if (chatId) {
        getChat()
      }
    }, [chatId])
  )

  return (
    <View style={styles.formWrapper}>
      <Text style={styles.title}>
        {!chatId ? 'Create a new chat' : 'Edit chat'}
      </Text>
      {chatId && (
        <View style={styles.delete}>
          <IconButton
            name="trash-outline"
            bgColor={colors.transparent}
            onPress={handlePressDelete}
          />
        </View>
      )}
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
      <Text style={styles.label}>Make this chat private</Text>
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
          {isPrivate
            ? 'Users can only join via invite.'
            : 'Anyone can join the chat.'}
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        <Button
          title={!chatId ? 'Create chat' : 'Save'}
          onPress={handleSubmitChat}
          bgColor={colors.submit}
        />
        <Button title="Cancel" onPress={onClose} bgColor={colors.cancel} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonGroup: {
    marginTop: 5,
  },
  formWrapper: {
    ...formWrapper,
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
  delete: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
})

export default ChatForm
