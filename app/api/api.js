import axios from 'axios'

import { API_BASE_URL } from 'react-native-dotenv'

export const callGet = (endpoint, token) =>
  axios({
    url: `${API_BASE_URL}${endpoint}`,
    headers: { 'x-auth-token': token },
  })

export const callPost = (data, endpoint, token) =>
  axios({
    url: `${API_BASE_URL}${endpoint}`,
    method: 'POST',
    headers: {
      'x-auth-token': token,
    },
    data: data,
  })

export const callDelete = (endpoint, token) =>
  axios({
    url: `${API_BASE_URL}${endpoint}`,
    method: 'DELETE',
    headers: {
      'x-auth-token': token,
    },
  })
