import React from 'react'

import theme from '../../styles/theme'

import {
  KeyboardAvoidingView,
  Modal as RNModal,
  Pressable,
  StyleSheet,
} from 'react-native'

function Modal({ visible, onClose, children }) {
  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
        <Pressable style={styles.overlay} onPress={onClose} />
        {children}
      </KeyboardAvoidingView>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.MODAL_OVERLAY,
  },
})

export default Modal
