import React from 'react'
import { Pressable, Text, View, StyleSheet, Platform } from 'react-native'

import getColorBrightness from '../../utils/colors/getColorBrightness'
import darkenHex from '../../utils/colors/darkenHex'
import colors from '../../styles/colors'
import theme from '../../styles/theme'

function Button({ title, onPress, bgColor, disabled }) {
  const isLightBg = getColorBrightness(bgColor) > 180
  const textColor = disabled
    ? colors.secondaryMedium
    : isLightBg
    ? colors.black
    : colors.white

  return (
    <View style={styles(bgColor, textColor).buttonWrapper}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          {
            backgroundColor:
              pressed && Platform.OS === 'ios'
                ? darkenHex(bgColor, 5)
                : bgColor,
          },
          styles().button,
          disabled && styles().disabled,
        ]}
        android_ripple={{ color: darkenHex(bgColor, 15) }}
      >
        <Text style={styles(bgColor, textColor).buttonText}>{title}</Text>
      </Pressable>
    </View>
  )
}

const styles = (bgColor, textColor) =>
  StyleSheet.create({
    buttonWrapper: {
      marginVertical: 5,
      overflow: 'hidden',
      height: 65,
      borderRadius: 65 / 2,
      justifyContent: 'center',
      backgroundColor: colors[bgColor],
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
    disabled: {
      backgroundColor: colors.secondaryLight,
    },
  })

export default Button
