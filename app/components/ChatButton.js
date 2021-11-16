import React from 'react'
import { Text, Pressable, StyleSheet } from 'react-native'

import colors from '../styles/colors'
import theme from '../styles/theme'

function ChatButton({chat, navigation}) {
  const handleOnPress = () => {
    navigation.navigate('Messages', { chatId: chat._id, chatName: chat.title })
  }

  return (
    <Pressable style={styles.chatItem} onPress={handleOnPress}>
      <Text numberOfLines={1} style={styles.title}>{chat.title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  chatItem: {
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 100,
    marginHorizontal: 8,
    marginTop: 10,
  },
  title: {
    fontSize: theme.FONT_SIZE_LARGE,
    fontWeight: theme.FONT_WEIGHT_BOLD,
  },
})

export default ChatButton
