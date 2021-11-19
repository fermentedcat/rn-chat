import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import { callGet } from '../api/api'

export const authenticateToken = createAsyncThunk(
  'auth/authenticateToken',
  async (token, { rejectWithValue, dispatch }) => {
    try {
      await callGet('user/auth', token)
      return token
    } catch (error) {
      return rejectWithValue([], error)
    }
  }
)

const initialAuthSlice = {
  isAuthenticated: false,
  token: '',
  userId: '',
  role: '',
  username: '',
  isLoading: false,
  currentRequestId: '',
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
    },
  },
  extraReducers: {
    [authenticateToken.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        const { userId, username, role } = jwtDecode(payload)
        state.isAuthenticated = true
        state.token = payload
        state.userId = userId
        state.role = role
        state.username = username
        state.isLoading = false
        state.currentRequestId = meta
      }
    },
    [authenticateToken.pending]: (state, { meta }) => {
      state.currentRequestId = meta
      state.isLoading = true
    },
    [authenticateToken.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta
        state.isLoading = false
        state.error = error.message
      }
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
