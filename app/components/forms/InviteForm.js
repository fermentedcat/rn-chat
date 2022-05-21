import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TextInput, FlatList } from 'react-native'
import { useSelector } from 'react-redux'

import { searchAllByUsername } from '../../api/user'
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
import Button from '../buttons/Button'
import OutlineButton from '../buttons/OutlineButton'

function InviteForm({ chatId, onClose }) {
  const token = useSelector((state) => state.auth.token)
  const { value, isValid, onChange, onBlur } = useInput(validateString)
  const { handleError } = useErrorHandler()
  const [subscriptions, setSubscriptions] = useState([])
  const [users, setUsers] = useState([])
  const initialError = {
    type: null,
    message: null,
  }
  const [error, setError] = useState(initialError)

  const toggleChooseUser = (index) => {
    setUsers((prevState) => {
      const updated = [...prevState]
      updated[index].chosen = !updated[index].chosen
      return updated
    })
  }

  const getChosenUsers = () => {
    return users.filter((user) => user.chosen)
  }

  const filterNewUsers = (chosen, users) => {
    // remove all users who are already subsribers and selected to invite
    return users.filter((user) => {
      return (
        !chosen.some((chosenUser) => chosenUser._id === user._id) &&
        !subscriptions.some((doc) => doc.user === user._id)
      )
    })
  }

  const handleSendInvites = async () => {
    try {
      const chosen = getChosenUsers()
      await addChatSubscriptions(chatId, chosen, token)
      onClose()
    } catch (error) {
      const errorMessage =
        error.response?.status === 500
          ? 'You are not authorized to send invites.'
          : 'Could not send invites. Please reload and try again.'
      const alertBody = [
        'Error',
        errorMessage,
        [{ text: 'Ok', style: 'cancel' }]
      ]
      handleError(error, alertBody)
    }
  }

  const fetchUsers = async () => {
    try {
      const data = await searchAllByUsername(value)
      if (data.length <= 0) {
        setError({ type: 'info', message: 'No users found.' })
      }
      const chosen = getChosenUsers()
      const filtered = filterNewUsers(chosen, data)
      setUsers([...chosen, ...filtered])
    } catch (error) {
      setError({
        type: 'danger',
        message: 'Unable to fetch users at this moment.',
      })
    }
  }

  const fetchSubscriptions = async () => {
    try {
      const data = await fetchChatSubscriptions(chatId, token)
      setSubscriptions(data)
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
        const chosen = getChosenUsers()
        setUsers(chosen)
      }
    }, 400)
    return () => {
      clearTimeout(timer)
    }
  }, [value])

  useEffect(() => {
    fetchSubscriptions()
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
        data={users}
        numColumns={2}
        keyExtractor={(item) => item._id}
        style={styles.usersList}
        renderItem={({ item, index }) => (
          <OutlineButton
            title={item.username}
            onPress={() => toggleChooseUser(index)}
            outline={item.chosen ? colors.primary : colors.secondary}
            checked={item.chosen}
          />
        )}
      />
      <View>
        {getChosenUsers().length > 0 && (
          <Button
            title={getChosenUsers().length > 1 ? 'Send invites' : 'Send invite'}
            onPress={handleSendInvites}
            bgColor={colors.primary}
          />
        )}
        <Button title="Cancel" onPress={onClose} bgColor={colors.cancel} />
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
