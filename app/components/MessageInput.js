import React, { useState } from 'react'
import { TextInput, StyleSheet, View, Text, Platform, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import colors from '../styles/colors'
import theme from '../styles/theme'

function MessageInput({ placeholder, onSubmit }) {
  const [userInput, setUserInput] = useState('')
  const [inputHeight, setInputHeight] = useState(0)
  const [isValidInput, setIsValidInput] = useState(false)

  const validateInput = (text) => {
    setIsValidInput(text.trim().length > 0)
  }

  const handleInputChange = (text) => {
    setUserInput(text)
    validateInput(text)
  }

  const handleInputSizeChange = (e) => {
    setInputHeight(e.nativeEvent.contentSize.height)
  }

  const handleSubmit = async () => {
    if (isValidInput) {
      const resetVal = await onSubmit({text: userInput})
      setUserInput(resetVal)
    }
  }

  return (
    <View style={styles().container}>
      <View style={styles().inputWrapper}>
        <TextInput
          multiline={true}
          style={styles(isValidInput, Math.max(40, inputHeight)).textInput}
          onChangeText={handleInputChange}
          onContentSizeChange={handleInputSizeChange}
          value={userInput}
          placeholder={placeholder}
        />
      </View>
      <Pressable disabled={!isValidInput} onPress={handleSubmit}>
        <Ionicons style={styles(isValidInput).submitBtn} name="send" />
      </Pressable>
    </View>
  )
}

const styles = (isValidInput, height) =>
  StyleSheet.create({
    container: {
      padding: 12,
      flex: 0,
      flexDirection: 'row',
      alignItems: 'flex-end',
      borderTopWidth: 2,
      borderTopColor: colors.secondaryExtraLight
    },
    inputWrapper: {
      flex: 1,
      borderWidth: 3,
      borderColor: colors.secondaryExtraLight,
      borderRadius: 40 / 2,
      marginRight: 12,
      marginLeft: 0,
    },
    submitBtn: {
      color: !isValidInput ? colors.secondaryLight : colors.primary,
      fontSize: 32,
      marginVertical: 6,
    },
    textInput: {
      height: height,
      maxHeight: 150,
      paddingHorizontal: 10,
      paddingTop: Platform.OS === 'ios' && height === 40 ? 10 : 0,
      paddingBottom: Platform.OS === 'ios' && height === 40 ? 10 : 0,
      fontSize: theme.FONT_SIZE_LARGE,
    },
  })

export default MessageInput
