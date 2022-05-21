import React, { useState } from 'react'
import { Pressable, Text, View, StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import colors from '../../styles/colors'
import theme from '../../styles/theme'

function OutlineButton({ title, onPress, disabled, outline, checked }) {
  const [pressing, setPressing] = useState(false)

  const togglePressing = () => {
    setPressing(!pressing)
  }

  return (
    <View style={styles(outline, pressing).buttonWrapper}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        onPressIn={togglePressing}
        onPressOut={togglePressing}
        style={[
          styles(outline, pressing).button,
          disabled && styles().disabled,
        ]}
        android_ripple={{ color: colors.secondary }}
      >
        <Text style={styles(outline).buttonText}>{title}</Text>
        {checked && (
          <Ionicons style={styles().checked} name="checkmark-circle" />
        )}
      </Pressable>
    </View>
  )
}

const styles = (outline, pressing) =>
  StyleSheet.create({
    buttonWrapper: {
      margin: 5,
      marginLeft: 0,
      overflow: 'hidden',
      borderRadius: 100,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: pressing ? colors.secondaryMedium : outline,
    },
    button: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:
        pressing && Platform.OS === 'ios'
          ? colors.secondaryExtraLight
          : colors.white,
    },
    buttonText: {
      fontSize: theme.FONT_SIZE_LARGE,
      fontWeight: theme.FONT_WEIGHT_BOLD,
      letterSpacing: theme.LETTER_SPACING_MEDIUM,
      color: outline,
      textAlign: 'center',
      padding: 10,
    },
    disabled: {
      opacity: 0.5,
    },
    checked: {
      fontSize: theme.FONT_SIZE_HEADING,
      color: colors.primary,
      paddingRight: 5,
    },
  })

export default OutlineButton
