import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import colors from '../styles/colors'
import { headingText, subHeadingText } from '../styles/common'
import CustomModal from './CustomModal'
import IconButton from './IconButton'

function ChatMenu({ chatId, onClose, navigation }) {
  const handleGoToEdit = () => {
    navigation.navigate('Edit', { chatId })
    onClose()
  }
  
  const handleGoToInvite = () => {
    navigation.navigate('Invite', { chatId })
    onClose()
  }

  return (
    <CustomModal visible={true} onClose={onClose}>
      <View style={styles.backdrop} />
      <View style={styles.closeButton}>
          <IconButton name="close" onPress={onClose} bgColor={colors.danger}/>
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.menu}>
          <View
            style={styles.menuItem}
          >
            <Text style={[styles.text, styles.menuText]}>Edit chat</Text>
            <IconButton name="arrow-forward" onPress={handleGoToEdit} bgColor={colors.primary}/>
          </View>
          <View
            style={styles.menuItem}
          >
            <Text style={[styles.text, styles.menuText]}>Add members</Text>
            <IconButton name="arrow-forward" onPress={handleGoToInvite} bgColor={colors.primary}/>
          </View>
        </View>
      </SafeAreaView>
    </CustomModal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: -200,
    right: -250,
    backgroundColor: colors.secondaryExtraLight,
    padding: 100,
    height: 700,
    width: 700,
    margin: 0,
    borderRadius: 700 / 2,
  },
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    alignItems: 'flex-end',
  },
  closeButton: {
    position: 'absolute',
    top: 55,
    right: 15,
  },
  menu: {
    marginTop: 150,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuText: {
    ...headingText,
    color: colors.grey,
    paddingRight: 20,
  },
  text: {
    ...subHeadingText,
    padding: 10,
  },
})

export default ChatMenu
