import React from 'react'

import textColorByBg from '../../utils/colors/textColorByBg'
import colors from '../../styles/colors'
import theme from '../../styles/theme'

import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet } from 'react-native'

function IconButton({name, onPress, bgColor}) {
  return (
    <Pressable style={({pressed}) => [styles(bgColor).iconWrapper, pressed && styles(bgColor).pressed]} onPress={onPress}>
      <Ionicons style={styles(bgColor).icon} name={name} />
    </Pressable>
  )
}

const styles = (bgColor) => StyleSheet.create({
  iconWrapper: {
    backgroundColor: bgColor ? bgColor : colors.secondaryMedium,
    height: 40,
    width: 40,
    borderRadius: 100,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pressed: {
    backgroundColor: bgColor ? theme.DARKEN(bgColor) : colors.secondary,
  },
  icon: {
    color: textColorByBg(bgColor || colors.secondaryMedium),
    fontSize: theme.FONT_SIZE_HEADING,
  },
})

export default IconButton
