import { callGet, callPost } from './api'


export const fetchChatSubscriptions = async (chatId, token) => {
  const response = await callGet(`chat/${chatId}/subscription/`, token)
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

