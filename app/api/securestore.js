import * as SecureStore from 'expo-secure-store'

export const setStoreAuthToken = async (token) => {
  await SecureStore.setItemAsync('SNICK_SNACK_TOKEN', token)
}

export const getStoreAuthToken = async () => {
  await SecureStore.getItemAsync('SNICK_SNACK_TOKEN')
}

export const deleteStoreAuthToken = async () => {
  await SecureStore.deleteItemAsync('SNICK_SNACK_TOKEN')
}

export const setStorePushToken = async (token) => {
  await SecureStore.setItemAsync('SNICK_SNACK_PUSH_TOKEN', token)
}

export const getStorePushToken = async () => {
  await SecureStore.getItemAsync('SNICK_SNACK_PUSH_TOKEN')
}

export const deleteStorePushToken = async () => {
  await SecureStore.deleteItemAsync('SNICK_SNACK_PUSH_TOKEN')
}