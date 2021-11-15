import React from 'react'
import { Pressable, Text, View, StyleSheet, Platform } from 'react-native'

import getColorBrightness from '../helpers/getColorBrightness'
import colors from '../styles/colors'
import theme from '../styles/theme'

function CustomButton({ title, handlePress, bgColor, rippleColor }) {
  const isLightBg = getColorBrightness(bgColor) > 200
  const textColor = isLightBg ? colors.black : colors.white

  return (
    <View style={styles(bgColor, rippleColor, textColor).buttonWrapper}>
      <Pressable
        onPress={handlePress}
        style={({pressed}) => [{
          backgroundColor: pressed && Platform.OS === 'ios' ? rippleColor : bgColor
        }, styles().button]}
        android_ripple={{ color: rippleColor }}
      >
        <Text style={styles(bgColor, rippleColor, textColor).buttonText}>{title}</Text>
      </Pressable>
    </View>
  )
}

const styles = (bgColor, rippleColor, textColor) => StyleSheet.create({
  buttonWrapper: {
    marginBottom: 10,
    overflow: 'hidden',
    height: 65,
    borderRadius: 65 / 2,
    justifyContent: 'center',
    backgroundColor: bgColor
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
