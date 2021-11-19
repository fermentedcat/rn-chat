import React from 'react'

import colors from '../../styles/colors'
import { subHeadingText, textInput } from '../../styles/common'

import { TextInput, StyleSheet, View, Text } from 'react-native'

function FormInput({ input, title, validationError, apiError, type }) {
  return (
    <View>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        style={[styles.input, input.hasError && styles.error]}
        value={input.value}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        placeholder={title}
        secureTextEntry={type === 'password'}
        autoCapitalize={type === 'fullName' ? 'words': 'none'}
        keyboardType={type === 'email' ? 'email-address' : 'default'}
      />
      {input.hasError && (
        <View style={styles.errorMessageBox}>
          <Text style={[styles.text, styles.errorText]}>
            {validationError}
          </Text>
        </View>
      )}
      {apiError && (
        <View style={styles.errorMessageBox}>
          <Text style={[styles.text, styles.errorText]}>
            {apiError}
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    ...subHeadingText
  },
  input: {
    ...textInput,
    borderRadius: 5,
  },
  error: {
    borderWidth: 1,
    borderColor: colors.danger,
  },
  errorMessageBox: {
    marginHorizontal: 0,
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.info,
    borderRadius: 20,
  },
})

export default FormInput
