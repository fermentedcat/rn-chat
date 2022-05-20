import React from 'react'
import EditWrapper from '../components/EditWrapper'
import ChatInviteForm from '../components/forms/ChatInviteForm'

function InviteScreen({ route, navigation }) {
  const { chatId } = route.params

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <EditWrapper>
      <ChatInviteForm chatId={chatId} onClose={handleGoBack} />
    </EditWrapper>
  )
}

export default InviteScreen