import React from 'react'

import theme from '../../styles/theme'
import { pageWrapper } from '../../styles/common'

import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native'

function EditWrapper({ children }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.pageWrapper}
    >
      <SafeAreaView style={styles.container}>
        {children}
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  pageWrapper: {
    ...pageWrapper,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: theme.BACKGROUND_COLOR_LIGHT,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default EditWrapper