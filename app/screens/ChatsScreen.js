import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

import { callGet, callPost } from '../api/api'
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

import ChatButton from '../components/ChatButton'
import ActionsBar from '../components/ActionsBar'
import IconButton from '../components/IconButton'
import Header from '../components/Header'
import ChatForm from '../components/forms/ChatForm'
import CustomModal from '../components/CustomModal'
import { useNotifications } from '../hooks/use-notifications';
import MainMenu from '../components/MainMenu';
import { useErrorHandler } from '../hooks/use-error-handler';

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
      const response = await callGet(`user/${userId}/subscription`, token)
      setSubscriptions(response.data)
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const setPushToken = async () => {
    const storedPushToken = await SecureStore.getItemAsync('SNICK_SNACK_PUSH_TOKEN')
    if (storedPushToken !== expoPushToken) {
      try {
        await SecureStore.setItemAsync('SNICK_SNACK_PUSH_TOKEN', expoPushToken)
        await callPost({token: expoPushToken}, 'user/pushToken', token)
      } catch (error) {
        const alertBody = ['Push notification error', 'An error occurred setting your push notifications.', [
          { text: 'Ok', style: 'cancel' }
        ]]
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
            <IconButton name="search" bgColor={colors.success} onPress={() => Alert.alert('Chat search not yet available...')}/>
            <IconButton name="ellipsis-vertical" onPress={() => setShowMenu(true)} bgColor={colors.success}/>
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
      <CustomModal visible={showModal} onClose={toggleModal}>
        <ChatForm onSubmit={handleChatAdded} onClose={toggleModal} />
      </CustomModal>
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
