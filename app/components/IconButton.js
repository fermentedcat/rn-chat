import React from 'react'

import textColorByBg from '../utils/textColorByBg'

import colors from '../styles/colors'
import theme from '../styles/theme'

import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet } from 'react-native'

function IconButton({name, onPress}) {
  return (
    <Pressable style={styles.iconWrapper} onPress={onPress}>
      <Ionicons style={styles.icon} name={name} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  iconWrapper: {
    padding: 8,
    // backgroundColor: colors.secondary,
    borderRadius: 100,
    margin: 1,
  },
  icon: {
    color: textColorByBg(colors.secondaryMedium),
    fontSize: theme.FONT_SIZE_HEADING,
  },
})

export default IconButton
