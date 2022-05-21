# SNICK SNACK

Chat app written in React Native using [Expo CLI](https://expo.dev/) 

In this project I wanted to explore React Native, to look into the differences from creating a similar app in React. 

## Deployment
Expo preview: [Snick Snack](https://expo.dev/@fermentedcat/snick-snack)

![Snick Snack Expo preview QR Code](./assets/expo-snick-snack-preview.svg)
<img src="./app/assets/expo-snick-snack-preview.svg">


## Key features
- Live streamed message updates with Server Sent Events (SSE)
- Push notifications using the [Expo Notifications API](https://docs.expo.dev/versions/latest/sdk/notifications/)

- Register & login
- Store JWT token for auto login
- Send, edit & delete chat message
- Create private / public chat
- Update chat name, description and visibility
- Invite members to chat rooms

## Code organisation
- `api:` Functions for sending requests to the chat api 
- `assets:` Static binary assets, such as app logo
- `components:` Reusable components, such as buttons and input fields
- `hooks:` Hooks for handling errors, inputs and push notifications
- `screens:` The main view components
- `store:` Redux store for storing auth/user info
- `styles:` Theme properties, colors and common style objects
- `utils:` Reusable functions, such as validation

## API

Connected to a Node.js server for authentication and data handling: https://github.com/fermentedcat/chat-api

## Running

#### Clone & install

- Clone this repo `git clone https://github.com/fermentedcat/rn-chat.git`
- `cd rn-chat`
- run `npm install`

#### Run app

- `npm run`


## Todo (backlog):

- Live update chat rooms list with SSE & push notifications
- Search for chats to join
- Show unread messages on chat in chat list
- Show user profile
- Edit user info
- User avatars
- Color themes
- Give nicknames to other chat members
- Support images in chat
- Notification settings

