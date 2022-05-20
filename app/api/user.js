import { callGet, callPost } from './api'

export const searchAllByUsername = async (value) => {
  const response = await callGet(`user/search-all/${value}`)
  return response.data
}

export const getUserSubscriptions = async (userId, token) => {
  const response = await callGet(`user/${userId}/subscription`, token)
  return response.data
}

export const getUserByUsername = async (username) => {
  const response = await callGet(`user/search/${username}`)
  return response.data
}

export const addNewUser = async (userData) => {
  const response = await callPost(userData, 'user')
  return response.data
}

export const authenticateUser = async (data) => {
  const response = await callPost(data, 'user/login')
  return response.data
}

export const setUserPushToken = async (pushToken, token) => {
  await callPost({ token: pushToken }, 'user/pushToken', token)
}
