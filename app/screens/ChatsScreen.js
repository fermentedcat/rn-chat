import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'

import { getStorePushToken, setStorePushToken } from '../api/securestore'
import { getUserSubscriptions, setUserPushToken } from '../api/user'
import { useNotifications } from '../hooks/use-notifications'
import { useErrorHandler } from '../hooks/use-error-handler'
import colors from '../styles/colors'

import {
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import ChatButton from '../components/buttons/ChatButton'
import ActionsBar from '../components/layout/ActionsBar'
import IconButton from '../components/buttons/IconButton'
import Header from '../components/layout/Header'
import ChatForm from '../components/forms/ChatForm'
import Modal from '../components/layout/Modal'
import MainMenu from '../components/menus/MainMenu'

function ChatsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [subscriptions, setSubscriptions] = useState(null)
  const { userId, token } = useSelector((state) => state.auth)

  const navigateToChat = (chatId, chatName) => {
    navigation.navigate('Messages', { chatId, chatName })
  }
  const { expoPushToken, cleanup } = useNotifications(navigateToChat)
  const { handleError } = useErrorHandler()

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleChatAdded = (newChat) => {
    setSubscriptions((prevState) => {
      return [...prevState, { chat: newChat }]
    })
    navigateToChat(newChat._id, newChat.title)
  }

  const fetchSubscriptions = async () => {
    try {
      const data = await getUserSubscriptions(userId, token)
      setSubscriptions(data)
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const setPushToken = async () => {
    const storedPushToken = await getStorePushToken()
    if (storedPushToken !== expoPushToken) {
      try {
        await setStorePushToken(expoPushToken)
        await setUserPushToken(expoPushToken, token)
      } catch (error) {
        const alertBody = [
          'Push notification error',
          'An error occurred setting your push notifications.',
          [{ text: 'Ok', style: 'cancel' }],
        ]
        handleError(error, alertBody)
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchSubscriptions()
    }, [])
  )

  useFocusEffect(
    useCallback(() => {
      if (expoPushToken?.length > 0) {
        setPushToken()
      }
      return () => cleanup()
    }, [expoPushToken])
  )

  return (
    <View style={styles.pageWrapper}>
      <SafeAreaView style={styles.container}>
        <Header title="Chats" logo bgColor={colors.success}>
          <ActionsBar>
            <IconButton
              name="search"
              bgColor={colors.success}
              onPress={() => Alert.alert('Chat search not yet available...')}
            />
            <IconButton
              name="ellipsis-vertical"
              onPress={() => setShowMenu(true)}
              bgColor={colors.success}
            />
            {showMenu && (
              <MainMenu
                onClose={() => setShowMenu(false)}
                onPressAdd={toggleModal}
              />
            )}
          </ActionsBar>
        </Header>
        {isLoading && <Text>Loading...</Text>}
        {subscriptions && (
          <FlatList
            data={subscriptions}
            keyExtractor={(item) => item.chat._id}
            style={styles.chatList}
            renderItem={({ item, index }) => (
              <ChatButton
                chat={item.chat}
                navigation={navigation}
                index={index}
              />
            )}
          />
        )}
      </SafeAreaView>
      <Modal visible={showModal} onClose={toggleModal}>
        <ChatForm onSubmit={handleChatAdded} onClose={toggleModal} />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: colors.success,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  chatList: {
    backgroundColor: colors.secondaryExtraLight,
  },
  addBtn: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 100,
    height: 50,
    width: 50,
    backgroundColor: colors.info,
  },
})

export default ChatsScreen
