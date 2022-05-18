import axios from 'axios'

// not updating properly, and file seems to fall asleep at prod
// import { API_BASE_URL } from 'react-native-dotenv'

const API_BASE_URL = 'https://snick-snack-api.herokuapp.com/api/'
// const API_BASE_URL = 'http://172.16.20.237:5000/api/'

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
