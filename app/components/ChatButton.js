import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import colors from '../styles/colors'
import theme from '../styles/theme'

function ChatButton({chat}) {
  return (
    <View style={styles.chatItem}>
      <Text numberOfLines={1} style={styles.title}>{chat.title}</Text>
    </View>
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
