import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Moment from 'react-moment'

import { deleteChatMessage } from '../api/message'
import { useErrorHandler } from '../hooks/use-error-handler'

import colors from '../styles/colors'
import theme from '../styles/theme'

import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import IconButton from './buttons/IconButton'

function Message({
  message,
  isRepeatedAuthor,
  showEdit,
  setShowEdit,
  onEdit,
  onDelete,
}) {
  const [showMoment, setShowMoment] = useState(false)
  const { userId, token } = useSelector((state) => state.auth)
  const { handleError } = useErrorHandler()
  const isByUser = userId === message.author._id

  const handleToggleMoment = () => {
    setShowMoment(!showMoment)
  }

  const handleEdit = () => {
    onEdit(message)
  }

  const handleDelete = () => {
    Alert.alert('Delete message', 'Are you sure?', [
      {
        text: 'Yes',
        onPress: async () => {
          try {
            await deleteChatMessage(message._id, token)
            onDelete(message._id)
          } catch (error) {
            handleError(error)
          }
        },
      },
      { text: 'No', style: 'cancel' },
    ])
  }

  return (
    <View>
      {showMoment && (
        <Moment fromNow element={Text} style={styles(isByUser).moment}>
          {message.createdAt}
        </Moment>
      )}
      <View style={styles(isByUser).container}>
        {!isRepeatedAuthor && (
          <Text style={styles(isByUser).username}>
            {message.author.username}
          </Text>
        )}
        <View style={styles().longPressMsgWrapper}>
          {showEdit && isByUser && (
            <>
              <IconButton
                name="create-outline"
                onPress={handleEdit}
                bgColor={colors.white}
              />
              <IconButton
                name="trash-outline"
                onPress={handleDelete}
                bgColor={colors.white}
              />
            </>
          )}
          <Pressable
            onPress={handleToggleMoment}
            onLongPress={() =>
              isByUser ? setShowEdit(message._id) : handleToggleMoment()
            }
            style={[
              styles(isByUser).messageWrapper,
              showEdit && styles(isByUser).longPressMsg,
            ]}
          >
            <Text style={styles().message}>{message.text}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = (isByUser) =>
  StyleSheet.create({
    container: {
      maxWidth: '70%',
      alignSelf: isByUser ? 'flex-end' : 'flex-start',
    },
    longPressMsgWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    longPressMsg: {
      backgroundColor: isByUser
        ? theme.DARKEN(colors.secondaryLight)
        : colors.danger,
    },
    messageWrapper: {
      backgroundColor: isByUser ? colors.secondaryLight : colors.info,
      borderRadius: 100,
      paddingVertical: 15,
      paddingHorizontal: 25,
      marginVertical: 5,
      marginHorizontal: 16,
    },
    message: {
      textAlign: 'left',
      fontSize: theme.FONT_SIZE_LARGE,
    },
    moment: {
      alignSelf: isByUser ? 'flex-end' : 'flex-start',
      paddingHorizontal: 27,
      textAlign: 'center',
      fontSize: theme.FONT_SIZE_MEDIUM,
      color: colors.secondaryMedium,
    },
    username: {
      alignSelf: isByUser ? 'flex-end' : 'flex-start',
      paddingHorizontal: 27,
      fontSize: theme.FONT_SIZE_MEDIUM,
      fontWeight: theme.FONT_WEIGHT_BOLD,
      color: colors.secondaryMedium,
    },
  })

export default Message
