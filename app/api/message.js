import { callGet, callPost, callDelete } from './api'

export const getChatMessages = async (chatId, token) => {
  const response = await callGet(`chat/${chatId}/message`, token)
  return response.data
}

export const addNewChatMessage = async (message, chatId, token) => {
  const response = await callPost(message, `chat/${chatId}/message`, token)
  return response.data
}

export const updateChatMessage = async (message, chatId, messageId, token) => {
  const response = await callPost(
    message,
    `chat/${chatId}/message/${messageId}`,
    token
  )
  return response.data
}

export const deleteChatMessage = async (messageId, token) => {
  await callDelete(`message/${messageId}`, token)
}
