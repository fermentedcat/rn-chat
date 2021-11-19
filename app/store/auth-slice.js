import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

const initialAuthSlice = {
  isAuthenticated: false,
  token: '',
  userId: '',
  role: '',
  username: '',
  isLoading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthSlice,
  reducers: {
    login(state, action) {
      const { userId, username, role } = jwtDecode(action.payload)
      state.isAuthenticated = true
      state.token = action.payload
      state.userId = userId
      state.role = role
      state.username = username
    },
    logout(state, action) {
      state.isAuthenticated = false
    }
  }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer