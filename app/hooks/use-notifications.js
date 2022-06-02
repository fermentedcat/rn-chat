import React, { useState, useEffect, useRef } from 'react'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export const useNotifications = (onOpen) => {
  const [expoPushToken, setExpoPushToken] = useState('')
  // const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  const registerForPushNotificationsAsync = async () => {
    let token
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
      token = (await Notifications.getExpoPushTokenAsync()).data
    }
    
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    return token
  }

  const cleanup = () => {
    Notifications.removeNotificationSubscription(notificationListener.current)
    Notifications.removeNotificationSubscription(responseListener.current)
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))
    

    // fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // setNotification(notification)
      })

    // fires when the user taps on a notification (works when app is foregrounded, backgrounded, or killed)
    // click on notification opens the chat
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { chatId, chatName } = response.notification.request.content.data
        onOpen(chatId, chatName)
      })
  }, [])

  return {
    expoPushToken,
    cleanup
  }
}
