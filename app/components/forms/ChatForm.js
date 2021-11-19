import React, { useState } from 'react'

import colors from '../../styles/colors'

import { Text, TextInput, View, StyleSheet, Switch } from 'react-native'
import CustomButton from '../CustomButton'
import { headingText, subHeadingText, textInput } from '../../styles/common'
import { useInput } from '../../hooks/use-input'
import { validateString } from '../../utils/validators'
import { callPost } from '../../api/api'
import { useSelector } from 'react-redux'

function ChatForm({ onSubmit, onClose }) {
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
      const response = await callPost(chatData, 'chat', token)
      const newChat = response.data
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
          placeholder="Chat name*"
          style={[styles.input, titleHasError && styles.errorInput]}
          value={titleInput}
          onChangeText={titleOnChange}
          onBlur={titleOnBlur}
        />
        {titleHasError && (
          <Text style={[styles.text, styles.errorText]}>
            Chat name is required.
          </Text>
        )}
        <TextInput
          placeholder="Description"
          style={styles.input}
          value={descriptionInput}
          onChangeText={descriptionOnChange}
        />
      </View>
      <Text style={[styles.text, styles.subHeader]}>
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
  text: {
    paddingHorizontal: 5,
  },
  title: {
    textAlign: 'center',
    ...headingText,
  },
  subHeader: {
    ...subHeadingText,
  },
  switchDescription: {
    color: colors.secondaryMedium,
  },
  privacyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
})

export default ChatForm
