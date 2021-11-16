import React from 'react'

import { Provider } from 'react-redux'
import { store } from './app/store/index'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ChatsScreen from './app/screens/ChatsScreen'
import MessagesScreen from './app/screens/MessagesScreen'
import WelcomeScreen from './app/screens/WelcomeScreen'
import Home from './app/screens/Home'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Chats"
            component={ChatsScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Messages"
            component={MessagesScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
