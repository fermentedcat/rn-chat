import React from 'react'
import { Pressable, Text, View, StyleSheet, Platform } from 'react-native'

import getColorBrightness from '../utils/colors/getColorBrightness'
import darkenHex from '../utils/colors/darkenHex'
import colors from '../styles/colors'
import theme from '../styles/theme'

function CustomButton({ title, onPress, bgColor }) {
  const isLightBg = getColorBrightness(bgColor) > 200
  const textColor = isLightBg ? colors.black : colors.white

  return (
    <View style={styles(bgColor, textColor).buttonWrapper}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [{
          backgroundColor: pressed && Platform.OS === 'ios' ? darkenHex(bgColor, 5) : bgColor
        }, styles().button]}
        android_ripple={{ color: darkenHex(bgColor, 15) }}
      >
        <Text style={styles(bgColor, textColor).buttonText}>{title}</Text>
      </Pressable>
    </View>
  )
}

const styles = (bgColor, textColor) => StyleSheet.create({
  buttonWrapper: {
    marginBottom: 10,
    overflow: 'hidden',
    height: 65,
    borderRadius: 65 / 2,
    justifyContent: 'center',
    backgroundColor: colors[bgColor]
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: theme.FONT_SIZE_LARGE,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    letterSpacing: theme.LETTER_SPACING_MEDIUM,
    color: textColor,
    textAlign: 'center',
  },
})

export default CustomButton
