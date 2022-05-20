import React from 'react'
import EditWrapper from '../components/EditWrapper'
import InviteForm from '../components/forms/InviteForm'

function InviteScreen({ route, navigation }) {
  const { chatId } = route.params

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <EditWrapper>
      <InviteForm chatId={chatId} onClose={handleGoBack} />
    </EditWrapper>
  )
}

export default InviteScreen