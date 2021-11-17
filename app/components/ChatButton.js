import React from 'react'
import { Text, Pressable, StyleSheet } from 'react-native'

import colors from '../styles/colors'
import theme from '../styles/theme'

function ChatButton({chat, navigation, index}) {
  const handleOnPress = () => {
    navigation.navigate('Messages', { chatId: chat._id, chatName: chat.title })
  }

  return (
    <Pressable style={({pressed}) => [styles.chatItem, index === 0 && styles.firstItem, pressed && styles.pressed]} onPress={handleOnPress}>
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
    marginBottom: 10,
  },
  firstItem: {
    marginTop: 10,
  },
  pressed: {
    backgroundColor: colors.secondaryLight,
  },
  title: {
    fontSize: theme.FONT_SIZE_LARGE,
    fontWeight: theme.FONT_WEIGHT_BOLD,
  },
})

export default ChatButton
