import React from 'react'
import { View, StyleSheet } from 'react-native'

function ActionsBar({children}) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexShrink: 1,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})

export default ActionsBar
