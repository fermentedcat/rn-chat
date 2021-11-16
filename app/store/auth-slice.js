import { createSlice } from '@reduxjs/toolkit'

const initialAuthSlice = {
  isAuthenticated: false,
  isLoading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthSlice,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true
    },
    logout(state, action) {
      state.isAuthenticated = false
    }
  }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer