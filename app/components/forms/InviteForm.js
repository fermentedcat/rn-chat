import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TextInput, FlatList } from 'react-native'
import { useSelector } from 'react-redux'

import { addChatSubscriptions, fetchChatSubscriptions } from '../../api/chat'
import { useErrorHandler } from '../../hooks/use-error-handler'
import { useInput } from '../../hooks/use-input'
import { validateString } from '../../utils/validators'
import colors from '../../styles/colors'

import {
  formWrapper,
  headingText,
  subHeadingText,
  textInput,
} from '../../styles/common'
import CustomButton from '../CustomButton'
import CustomOutlineButton from '../CustomOutlineButton'
import { searchAllByUsername } from '../../api/user'

function InviteForm({ chatId, onClose }) {
  const token = useSelector((state) => state.auth.token)
  const { value, isValid, onChange, onBlur } = useInput(validateString)
  const { handleError } = useErrorHandler()
  const [subsribers, setSubscribers] = useState([])
  const [users, setUsers] = useState([])
  const [chosenUsers, setChosenUsers] = useState([])
  const initialError = {
    type: null,
    message: null,
  }
  const [error, setError] = useState(initialError)

  const toggleChooseUser = (user) => {
    const isChosen = chosenUsers.some((chosen) => chosen._id === user._id)
    isChosen ? handleUnchooseUser(user) : handleChooseUser(user)
  }

  const handleChooseUser = (user) => {
    setChosenUsers((prevState) => {
      return [...prevState, user]
    })
    setUsers((prevState) => {
      return prevState.filter((fetched) => fetched._id !== user._id)
    })
  }

  const handleUnchooseUser = (user) => {
    setUsers((prevState) => {
      return [...prevState, user]
    })
    setChosenUsers((prevState) => {
      return prevState.filter((chosen) => chosen._id !== user._id)
    })
  }

  const handleSendInvites = async () => {
    try {
      await addChatSubscriptions(chatId, chosenUsers, token)
      onClose()
    } catch (error) {
      const errorMessage = error.response?.status === 500 ? 'You are not authorized to send invites.' : 'Could not send invites. Please reload and try again.'
      const alertBody = ['Error', errorMessage, [
        { text: 'Ok', style: 'cancel' }
      ]]
      handleError(error, alertBody)
    }
  }

  const fetchUsers = async () => {
    try {
      const data = await searchAllByUsername(value)
      if (data.length <= 0) {
        setError({ type: 'info', message: 'No users found.' })
      }
      const filtered = data.filter((user) => {
        return (
          !chosenUsers.some((chosen) => chosen._id === user._id) &&
          !subsribers.some((doc) => doc.user === user._id)
        )
      })
      setUsers(filtered)
    } catch (error) {
      setError({
        type: 'danger',
        message: 'Unable to fetch users at this moment.',
      })
    }
  }

  const fetchSubscribers = async () => {
    try {
      const data = await fetchChatSubscriptions(chatId, token)
      setSubscribers(data)
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    // search for users when user has stopped typing
    const timer = setTimeout(() => {
      setError(initialError)
      if (isValid) {
        fetchUsers()
      } else {
        setUsers([])
      }
    }, 400)
    return () => {
      clearTimeout(timer)
    }
  }, [value])

  useEffect(() => {
    fetchSubscribers()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invite to chat</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Search users:</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholder="Search users..."
        />
        {error.message && (
          <Text style={[styles.text, styles[error.type]]}>{error.message}</Text>
        )}
      </View>

      <FlatList
        data={[...chosenUsers, ...users]}
        numColumns={2}
        keyExtractor={(item) => item._id}
        style={styles.usersList}
        renderItem={({ item, index }) => (
          <CustomOutlineButton
            title={item.username}
            onPress={() => toggleChooseUser(item)}
            outline={
              chosenUsers.some((user) => user._id === item._id)
                ? colors.primary
                : colors.secondary
            }
            checked={chosenUsers.some((user) => user._id === item._id)}
          />
        )}
      />
      <View>
        {chosenUsers.length > 0 && (
          <CustomButton
            title={chosenUsers.length > 1 ? 'Send invites' : 'Send invite'}
            onPress={handleSendInvites}
            bgColor={colors.primary}
          />
        )}
        <CustomButton
          title="Cancel"
          onPress={onClose}
          bgColor={colors.cancel}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...formWrapper,
    justifyContent: 'flex-start',
    minHeight: '60%',
    maxHeight: '90%',
  },
  title: {
    textAlign: 'center',
    ...headingText,
  },
  label: {
    ...subHeadingText,
    paddingHorizontal: 5,
  },
  searchWrapper: {
    margin: 10,
  },
  usersList: {
    paddingVertical: 10,
  },
  input: {
    ...textInput,
  },
  inputGroup: {
    paddingVertical: 10,
    paddingBottom: 0,
  },
  text: {
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
  },
  info: {
    color: colors.secondaryMedium,
    borderColor: colors.info,
  },
  danger: {
    color: colors.danger,
    borderColor: colors.danger,
  },
  chosenList: {
    flex: 1,
    margin: 20,
    marginLeft: 0,
  },
})

export default InviteForm
