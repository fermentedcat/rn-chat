import { configureStore } from "@reduxjs/toolkit"
import authSlice from './auth-slice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})