import { callGet, callPost, callDelete } from './api'


export const getChatById = async (chatId, token) => {
  const response = await callGet(`chat/${chatId}`, token)
  return response.data
}

export const fetchChatSubscriptions = async (chatId, token) => {
  const response = await callGet(`chat/${chatId}/subscription/`, token)
  return response.data
}

export const addNewChat = async (chatData, token) => {
  const response = await callPost(chatData, 'chat', token)
  return response.data
}

export const updateChat = async (chatData, chatId, token) => {
  const response = await callPost(chatData, `chat/${chatId}`, token)
  return response.data
}

export const addChatSubscriptions = async (chatId, users, token) => {
  await Promise.all(
    users.map(async (user) => {
      await callPost(
        {},
        `chat/${chatId}/user/${user._id}/subscription`,
        token
      )
    })
  )
}

export const deleteChat = async (chatId, token) => {
  await callDelete(`chat/${chatId}`, token)
}

