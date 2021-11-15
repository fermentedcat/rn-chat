import React, { useState } from 'react'
import { TextInput, StyleSheet, View, Text, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import colors from '../styles/colors'
import theme from '../styles/theme'

function MessageInput({ placeholder }) {
  const [userInput, setUserInput] = useState('')
  const [inputHeight, setInputHeight] = useState(0)

  const handleInputChange = (text) => {
    setUserInput(text)
  }

  const handleInputSizeChange = (e) => {
    setInputHeight(e.nativeEvent.contentSize.height)
  }

  return (
    <View style={styles().container}>
      <View style={styles().inputWrapper}>
        <TextInput
          multiline={true}
          style={styles(Math.max(40, inputHeight)).textInput}
          onChangeText={handleInputChange}
          onContentSizeChange={handleInputSizeChange}
          value={userInput}
          placeholder={placeholder}
        />
      </View>
      <Ionicons name="send" size={32} color={colors.primary} />
    </View>
  )
}

const styles = (height) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 12,
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputWrapper: {
      flex: 1,
      borderWidth: 3,
      borderColor: colors.secondaryExtraLight,
      borderRadius: 40 / 2,
      margin: 12,
      marginLeft: 0,
    },
    textInput: {
      height: height,
      paddingHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: theme.FONT_SIZE_LARGE,
    },
  })

export default MessageInput
