import { callGet } from './api'

export const searchAllByUsername = async (value) => {
  const response = await callGet(`user/search-all/${value}`)
  return response.data
}