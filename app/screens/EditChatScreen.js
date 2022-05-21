import React from 'react'

import ChatForm from '../components/forms/ChatForm'
import EditWrapper from '../components/layout/EditWrapper'

function EditChatScreen({ route, navigation }) {
  const { chatId } = route.params

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleGoToChats = () => {
    navigation.navigate('Chats')
  }

  const handleGoToMessages = (chat) => {
    navigation.navigate('Messages', { chatId: chat._id, chatName: chat.title })
  }

  return (
    <EditWrapper>
      <ChatForm
          chatId={chatId}
          onDelete={handleGoToChats}
          onSubmit={handleGoToMessages}
          onClose={handleGoBack}
        />
    </EditWrapper>
  )
}

export default EditChatScreen
