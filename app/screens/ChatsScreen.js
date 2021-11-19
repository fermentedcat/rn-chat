import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { callGet } from '../api/api'
import { logout } from '../store/auth-slice'
import colors from '../styles/colors'

import {
  FlatList,
  Platform,
  Pressable,
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

function ChatsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [subscriptions, setSubscriptions] = useState(null)
  const { userId, token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleChatAdded = (newChat) => {
    setSubscriptions((prevState) => {
      return [...prevState, { chat: newChat }]
    })
    navigation.navigate('Messages', {
      chatId: newChat._id,
      chatName: newChat.title,
    })
  }

  const fetchSubscriptions = async () => {
    try {
      const response = await callGet(`user/${userId}/subscription`, token)
      setSubscriptions(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  return (
    <View style={styles.pageWrapper}>
      <SafeAreaView style={styles.container}>
        <Header title="Chats" logo>
          <ActionsBar>
            <IconButton name="search" />
            <IconButton name="ellipsis-vertical" onPress={handleLogout} />
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
        <Pressable style={styles.addBtn} onPress={toggleModal}></Pressable>
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
    backgroundColor: colors.secondaryMedium,
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
