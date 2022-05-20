import React from 'react'
import { useDispatch } from 'react-redux';

import { deleteStoreAuthToken, deleteStorePushToken } from '../api/securestore';
import { logout } from '../store/auth-slice'
import colors from '../styles/colors'
import { headingText, subHeadingText } from '../styles/common'

import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import CustomModal from './CustomModal'
import IconButton from './IconButton'

function MainMenu({ onClose, onPressAdd }) {
  const dispatch = useDispatch()
  const handleLogout = async () => {
    await deleteStoreAuthToken()
    await deleteStorePushToken()
    dispatch(logout())
  }
  
  const handlePressAdd = () => {
    onPressAdd()
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
            <Text style={[styles.text, styles.menuText]}>Add new chat</Text>
            <IconButton name="chatbubbles-outline" onPress={handlePressAdd} bgColor={colors.primary}/>
          </View>
          <View
            style={styles.menuItem}
          >
            <Text style={[styles.text, styles.menuText]}>Logout</Text>
            <IconButton name="arrow-back-outline" onPress={handleLogout} bgColor={colors.primary}/>
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

export default MainMenu
