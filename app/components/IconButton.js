import React from 'react'

import textColorByBg from '../utils/textColorByBg'

import colors from '../styles/colors'
import theme from '../styles/theme'

import { Ionicons } from '@expo/vector-icons'
import { View, StyleSheet } from 'react-native'

function IconButton({name, onPress}) {
  return (
    <View style={styles.iconWrapper}>
      <Ionicons style={styles.icon} name={name} />
    </View>
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
