import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Moment from 'react-moment'
import colors from '../styles/colors'
import theme from '../styles/theme'
import { useSelector } from 'react-redux'

function Message({ message, isRepeatedAuthor }) {
  const [showMoment, setShowMoment] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const userId = useSelector((state) => state.auth.userId)
  const isByUser = userId === message.author._id

  const handleToggleMoment = () => {
    setShowMoment(!showMoment)
  }

  const handleToggleEdit = () => {
    setShowEdit(!showEdit)
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
        <Pressable
          onPress={handleToggleMoment}
          onLongPress={handleToggleEdit}
          style={styles(isByUser).messageWrapper}
        >
          <Text style={styles().message}>{message.text}</Text>
        </Pressable>
      </View>
      {showEdit && <Text>Edit</Text>}
    </View>
  )
}

const styles = (isByUser) =>
  StyleSheet.create({
    container: {
      maxWidth: '70%',
      alignSelf: isByUser ? 'flex-end' : 'flex-start',
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
